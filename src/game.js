const Questions = require('../config/test-data');
const axios = require('axios');
const omit = require('../utils/myOmit.js');
const shuffle = require('../utils/shuffle.js');
const triviaAPI = require('../utils/triviaAPI');

function Game (questions, users, io){
    // Game Data Variables Go Here

    this.gameData = {
        // id of game
        _id: undefined,
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
        // Current question's number
        questionToBeSent: undefined,

        questionNum: 0,
        // Current Answer 
        correctAnswer: undefined,
        // Game state variable for tracking PreGame, QuestionActive, Intermission, or GameEnd
        gameState: undefined,
        // Client Answers for rendering on front-end
        clientAnswers: {},

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
        this.gameData.gameState = 'pregame';
        this.gameData.currentQuestion = this.gameData.questions[this.gameData.questionNum];
        this.gameData.clientAnswers = this.randomizeAnswers();
        this.tickInterval();
    };

    // Method that transitions to the next game state phase (Question to Intermission, etc.)
    this.gameLoopStep = () => {
        switch(this.gameData.gameState) {
            case 'pregame':
                this.resetTimer(10);
                this.gameData.gameState = 'questionActive';
                this.nextQuestion();
                this.tickInterval();
                break;
            case 'questionActive':
                this.resetTimer(5);
                this.gameData.gameState = 'intermission';
                this.gameData.correctAnswer = this.gameData.currentQuestion.correct_answer;
                this.tickInterval();
                break;
            case 'intermission':
                if (this.gameData.totalQuestions == this.gameData.questionNum+1) {
                    this.resetTimer(10);
                    console.log("Game End!");
                    this.gameData.gameState = 'gameEnd';
                    this.tickInterval();
                    break;
                } else {
                    this.resetTimer(10);
                    this.gameData.gameState = 'questionActive';
                    this.gameData.correctAnswer = undefined;
                    this.nextQuestion();
                    this.tickInterval();
                    break;
                }
            case 'gameEnd':
                this.resetTimer(10);
                this.gameData.gameState = 'pregame';
                //Fixed broken end game loop
                this.gameData.questionNum = 0;
                triviaAPI(res=>{
                    this.gameData.questions = res.data.results;
                    this.gameReset();
                    this.tickInterval();    
                })
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
        // console.log(this.gameData.questionToBeSent);
    }

    // Method for slightly modifying server's gameState for client view (Remove excess questions, etc.)
    // this.createClientState = () => {
    //     let clientState = this.gameData;
    //     console.log(clientState);
    //     delete clientState.questions;

    //     if (this.gameData.gameState == 'questionActive' || this.gameData.gameState == 'pregame') {
    //         delete clientState.currentAnswer;
    //         clientState.currentQuestion = this.createClientQuestion();
    //     }
    //     console.log(clientState);
    //     return clientState;
    // }

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
        // Create object file to return
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
        console.log(this.gameData.socketObj);
        io.sockets.to('master').emit('gameState', this.gameData.socketObj);
        // moved this here so it will still tick at 0 and reset at 0 instead of having a 1 second delay
        if (this.gameData.timer < 0) {
            this.gameLoopStep();
        }
    }

    this.resetTimer = (time) => {
        this.gameData.timer = time;
    }

    this.gameReset = ()=>{
        this.gameData = {
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
        },
    };
    }

}

module.exports = Game;