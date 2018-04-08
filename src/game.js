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
    };

    this.initializeGame = () => {
        // Start pre-game countdown to first question
        this.gameData.gameState = 'pre-game';
        this.gameData.currentQuestion = this.gameData.questions[this.gameData.questionNum];
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
        io.sockets.to('room').emit('msg', this.gameData.currentQuestion);
        console.log("New question sent!");
        console.log(this.gameData.currentQuestion);
    }

    // Method for slightly modifying server's gameState for client view (Remove excess questions, etc.)
    this.createClientState = () => {
        let clientState = this.gameData;
        clientState.questions = undefined;

        if (this.gameData.gameState == 'questionActive' || this.gameData.gameState == 'pre-game') {
            clientState.currentAnswer = undefined;
        }
        
        return clientState;
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
            io.sockets.to('room').emit('roomState', this.createClientState());
        }
    }

    this.resetTimer = (time) => {
        this.gameData.timer = time;
    }

}

module.exports = Game;