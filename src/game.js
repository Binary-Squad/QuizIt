const Questions = require('../config/test-data');
const axios = require('axios');

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
        questionNum: 0,
        // Current Answer 
        currentAnswer: undefined,
        // Game state variable for tracking Pre-Game, QuestionActive, Intermission, or GameEnd
        gameState: undefined,
        // Client Answers for rendering on front-end
        clientAnswers: {}
    };

    this.initializeGame = () => {
        // Start pre-game countdown to first question
        this.gameData.gameState = 'pre-game';
        this.gameData.currentQuestion = this.gameData.questions[this.gameData.questionNum];
        this.gameData.currentAnswer = this.gameData.currentQuestion.correct_answer;
        this.gameData.clientAnswers = this.randomizeAnswers();
        this.tickInterval();
    };

    // Method that transitions to the next game state phase (Question to Intermission, etc.)
    this.gameLoopStep = () => {
        switch(this.gameData.gameState) {
            case 'pre-game':
                this.resetTimer(10);
                this.gameData.gameState = 'questionActive';
                this.nextQuestion();
                this.tickInterval();
                break;
            case 'questionActive':
                this.resetTimer(5);
                this.gameData.gameState = 'intermission';
                this.tickInterval();
                break;
            case 'intermission':
                if (this.gameData.totalQuestions == this.gameData.questionNum) {
                    this.resetTimer(5);
                    console.log("Game End!");
                    this.gameData.gameState = 'gameEnd';
                    this.tickInterval();
                    break;
                } else {
                    this.resetTimer(10);
                    this.gameData.gameState = 'questionActive';
                    this.nextQuestion();
                    this.tickInterval();
                    break;
                }
            case 'gameEnd':
                this.resetTimer(10);
                this.gameData.gameState = 'pre-game';
                this.tickInterval();
                break; 
        }
    }

    this.nextQuestion = () => {
        // Function for setting the next current Question goes here.
        this.gameData.questionNum++;
        this.gameData.currentQuestion = questions[this.gameData.questionNum];
        this.gameData.currentAnswer = this.gameData.currentQuestion.correct_answer;
        this.gameData.clientAnswers = this.randomizeAnswers();
        io.sockets.to('room').emit('msg', this.gameData);
        console.log("New question sent!");
        console.log(this.gameData.currentQuestion);
        console.log(this.gameData.currentAnswer);
        console.log(this.gameData.clientAnswers);
    }

    // Method for slightly modifying server's gameState for client view (Remove excess questions, etc.)
    // this.createClientState = () => {
    //     let clientState = this.gameData;
    //     console.log(clientState);
    //     delete clientState.questions;

    //     if (this.gameData.gameState == 'questionActive' || this.gameData.gameState == 'pre-game') {
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
        this.shuffle(answers);
        // Create object file to return
        let answersObj = {};
        // Map randomized array values to numeric key pairings
        for (i = 0; i < answers.length; i++) {
            answersObj[i] = answers[i];
        }

        return answersObj;
    }

    // Use Fisher-Yates Shuffle to randomize an array (to use with question answers)
    this.shuffle = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    this.tick = undefined;

    this.tickInterval = () => {
        clearInterval(this.tick);
        this.tick = setInterval(this.handleTick, 1000); 
    }

    this.handleTick = () => {
        if (this.gameData.timer < 0) {
            this.gameLoopStep();
        } else {
            console.log("Game tick interval. Game State: " + this.gameData.gameState + " with timer " + this.gameData.timer);
            this.gameData.timer--;
            io.sockets.to('room').emit('roomState', this.gameData);
        }
    }

    this.resetTimer = (time) => {
        this.gameData.timer = time;
    }

}

module.exports = Game;