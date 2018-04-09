const Questions = require('../config/test-data');
const axios = require('axios');
const omit = require('../utils/myOmit.js');
const shuffle = require('../utils/shuffle.js');
const triviaAPI = require('../utils/triviaAPI');
const gameInstance = require('../models/game');

function Game (questions, users, settings, io, addGame){
    // Game Data Variables Go Here

    this.gameData = {
        // id of game
        _id: undefined,
        // The settings from the API call
        category: settings.category,
        difficulty: settings.difficulty,
        type: settings.type,
        // Users who have played in the current game
        users: users,
        // Timer for tracking countdowns for questions or to next question
        timer: 10,
        // Questions for the current game. Called for the current API.
        questions: questions,
        // Total number of questions
        totalQuestions: questions.length,
        // The current question
        currentQuestion: undefined,
        // Current question to be sent to client.
        questionToBeSent: undefined,

        questionNum: 0,
        // Current Answer 
        correctAnswer: undefined,
        // Game state variable for tracking PreGame, QuestionActive, Intermission, or GameEnd
        gameState: undefined,
        // Client Answers for rendering on front-end
        clientAnswers: {},
        // Socket object for sending to client.
        socketObj: {
            users:[],
            question:{},
            correctAnswer:"",
            gameState:"pregame",
            timer:10,
            totalQuestions:0,
            questionNum:0
        },
    };

    this.initializeGame = () => {
        // Start pregame countdown to first question
        this.save();
        this.gameData.gameState = 'pregame';
        this.gameData.currentQuestion = this.gameData.questions[this.gameData.questionNum];
        this.gameData.clientAnswers = this.randomizeAnswers();
        this.tickInterval();
    };

    // Method that transitions to the next game state phase (Question to Intermission, etc.)
    this.gameLoopStep = () => {
        switch(this.gameData.gameState) {
            case 'pregame':
                addGame(this.gameData._id);
                this.resetTimer(10);
                this.gameData.gameState = 'questionActive';
                this.nextQuestion();
                this.tickInterval();
                break;
            case 'questionActive':
                this.resetTimer(5);
                this.gameData.gameState = 'intermission';
                this.gameData.correctAnswer = this.gameData.currentQuestion.correct_answer;
                this.update();
                this.tickInterval();
                break;
            case 'intermission':
                if (this.gameData.totalQuestions == this.gameData.questionNum+1) {
                    this.resetTimer(10);
                    console.log("Game End!");
                    this.gameData.gameState = 'gameEnd';
                    this.update();
                    this.tickInterval();
                    break;
                } else {
                    this.resetTimer(10);
                    this.gameData.gameState = 'questionActive';
                    this.gameData.correctAnswer = undefined;
                    this.nextQuestion();
                    this.update();
                    this.tickInterval();
                    break;
                }
            case 'gameEnd':
                // Save currently game document before resetting. 
                this.resetTimer(10);
                this.gameData.gameState = 'pregame';
                // Fixed broken end game loop
                this.gameData.questionNum = 0;
                // Call API for new questions.
                triviaAPI(res=>{
                    this.gameData.questions = res.data.results;
                    this.gameReset();
                    this.tickInterval();    
                });
                this.save();
                break; 
        }
    }

    this.nextQuestion = () => {
        // Function for setting the next current Question goes here.
        this.gameData.questionNum++;
        this.gameData.currentQuestion = questions[this.gameData.questionNum];
        this.gameData.questionToBeSent = omit(this.gameData.currentQuestion, "correct_answer");
        this.gameData.questionToBeSent = omit(this.gameData.questionToBeSent, "incorrect_answers");
        this.gameData.questionToBeSent.answers = this.randomizeAnswers();
    }

    // Method or randomizing the answers and generating the client-facing question object.
    this.randomizeAnswers = () => {
        // Create temporary array to store our answers before shuffling
        let answers = [];
        // Push the correct answer
        answers.push(this.gameData.currentQuestion.correct_answer);
        // Concatenate the array of incorrect answers
        answers = answers.concat(this.gameData.currentQuestion.incorrect_answers);
        // Shuffle the array
        shuffle(answers);
    
        return answers;
    }

    this.tick = undefined;

    this.tickInterval = () => {
        clearInterval(this.tick);
        this.tick = setInterval(this.handleTick, 1000); 
    }

    this.handleTick = () => {        
        this.gameData.socketObj = {
            users:this.gameData.users,
            question:this.gameData.questionToBeSent,
            correctAnswer:this.gameData.correctAnswer,
            gameState:this.gameData.gameState,
            timer:this.gameData.timer,
            totalQuestions:this.gameData.totalQuestions,
            questionNum:this.gameData.questionNum+1
        }
        this.gameData.timer--;
        // console.log(this.gameData.socketObj);
        io.sockets.to('master').emit('gameState', this.gameData.socketObj);
        // moved this here so it will still tick at 0 and reset at 0 instead of having a 1 second delay
        if (this.gameData.timer < 0) {
            this.gameLoopStep();
        }
    }

    this.resetTimer = (time) => {
        this.gameData.timer = time;
    }

    this.gameReset = () => {
        let category = this.gameData.category;
        let type = this.gameData.type;
        let difficulty = this.gameData.difficulty;
        let users = this.gameData.users;


        this.gameData = {
            // Reset id so a new document can be saved.
            _id: undefined,
            // The settings from the API call
            category: category,
            difficulty: difficulty,
            type: type,
            // Users who have played in the current game
            users: users,
            timer: 10,
            // Questions for the current game. Called for the current API.
            totalQuestions: questions.length,
            // The current question
            currentQuestion: undefined,
            // Current question's number
            questionToBeSent: undefined,

            questionNum: 0,
            // Current Answer 
            correctAnswer: undefined,
            // Game state variable for tracking PreGame, QuestionActive, Intermission, or GameEnd
            gameState: "pregame",

            socketObj: {
                users:[],
                question:{},
                correctAnswer:"",
                gameState:"pregame",
                timer:10,
                totalQuestions:0,
                questionNum:0
            }
        };
        this.save();
    }

    this.save = () => {
        const gameDocument = new gameInstance({
            _id: this._id,
            users: this.gameData.users,
            questions: this.gameData.questions,
            score: this.gameData.score,
            numQuestions: this.gameData.totalQuestions,
            category: this.gameData.category,
            difficulty: this.gameData.difficulty,
            type: this.gameData.type
        });
        gameDocument.save().then((res) => {
            this.gameData._id = res._id;
            console.log('Game document ' + res._id + ' has been created in the database.');
        });
    }
    // Method for packaging the game data that we want to save to Mongo.
    this.createGameObj = () => {
        let gameObj = {
            users: this.gameData.users,
            questions: this.gameData.questions,
            score: this.gameData.score,
            numQuestions: this.gameData.totalQuestions,
            category: this.gameData.category,
            difficulty: this.gameData.difficulty,
            type: this.gameData.type
        }
        return gameObj;
    }

    this.update = () => {
        let gameObj = this.createGameObj();

        gameInstance.update({
            _id: this.gameData._id
            },
            {
                users: gameObj.users,
                questions: gameObj.questions,
                score: gameObj.score,
                numQuestions: gameObj.totalQuestions,
                category: gameObj.category,
                difficulty: gameObj.difficulty,
                type: gameObj.type
            }).then(() => {
            console.log("Game document " + this.gameData._id + " has been saved to database.");
        });
    }
}

module.exports = Game;