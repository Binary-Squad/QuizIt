const Game = require('./game');
const mongoose = require('mongoose');
const Session = require('../models/gameSession');
const axios = require('axios');
const triviaAPI = require('../utils/triviaAPI');
const shuffle = require('../utils/shuffle');
// const myRenameProperty = require('../utils/myRenameProperty');
const myOmit = require('../utils/myOmit');

function GameSession(io) {
    
    // Array that stores the userIds of all users within this game session
    this.users = [];
    // Variable that we will instantiate each new game into
    this.currentGame = undefined;
    // Variable for storing the session's ID
    this._id = undefined;
    // Variable for storign the session's type. 
    this.type = undefined;
    

    // Method that sets up the session's state
    this.create = ()=>{
        // NEED code to create a new session document in Mongo and return the objectId
        this.addUser('User Object To Go Here');
        this.createNewGame();
    };

    // Method that adds a user to the session
    this.addUser = (user)=>{
        // REPLACE the key value with the user object's id.
        this.users.push(user);
        // console.log(this);
    };

    // Method for removing a user from the session by userId
    this.remUser = (userId)=>{
        // NEED TO WRITE THIS
    };

    // Method for saving the session to MongoDB
    this.save = (cb)=>{
        const sessionDocument = new Session({
            users: this.users,
            currentGame: this.currentGame,
            type: this.type
        });
        sessionDocument.save().then((res) => {
            this._id = res._id;
            cb(res);
        });
    };

    // Creating a new game
    this.createNewGame = ()=>{
        triviaAPI(res=>{
            res.data.results.forEach((question)=>{
                // question.myRenameProperty('incorrect_answers','answers');
                question.incorrect_answers.push(question.correct_answer);
                shuffle(question.incorrect_answers);
                console.log(question);
            })
            let newGame = new Game(res.data.results);
            newGame.create();
            this.currentGame=newGame;
            console.log('--------------------------------------------------');
            console.log(this.currentGame.timer);
            this.initiateGame('master');
        })
    };

    // Game logic for starting the game. Here we will need to go through the questions and send them to the user accordingly via the 'master' room for MVP
    this.initiateGame = (room)=>{
        // var tempRoom = room;
        setTimeout(()=>{
            this.startGame(room);
        }, 5000)
    }

    this.startGame = (room)=>{
        // var tempRoom = room;
        var roundTime = 3000;
        var startAfter = 2000;
        var gameEndTime = 3000;
        var intermissionTime = 1000;
        var currentQuestion = 0;
        var timer = this.currentGame.timer = (this.currentGame.questions.length*roundTime+startAfter+gameEndTime)/1000;
        var startingTime = this.currentGame.startingTime = this.currentGame.questions.length*roundTime+startAfter+gameEndTime;
        console.log("STARTINGTIME"+startingTime);
        var socketObj = {
            question:{},
            timer:timer,
            state:"pregame"
        };
        var setEndTimeout = setTimeout(()=>{
                socketObj.question = {};
                socketObj.state = "roundEnd";
                // console.log(questionToSend);
            },startingTime-gameEndTime);
        this.currentGame.questions.forEach((question,index)=>{
            var timeoutTime = startAfter+roundTime*index;
            var answerTime = startAfter+roundTime*index+(roundTime-intermissionTime);
            console.log(timeoutTime);
            var setQuestionTimeout = setTimeout(()=>{
                var questionToSend = myOmit(question,"correct_answer");
                socketObj.question = questionToSend;
                socketObj.state = "questionStart";
            },timeoutTime);
            var setAnswerTimeout = setTimeout(()=>{
                var questionToSend = question;
                socketObj.question = questionToSend;
                socketObj.state = "questionEnd";
            },answerTime);
        })
        var setTimerInterval = setInterval(()=>{
            socketObj.timer--;
            console.log(socketObj);
            io.sockets.to(room).emit('roomState',socketObj);
        }, 1000);
        // setInterval(()=>{
        //     this.currentGame.timer--;
        //     var socketObj = {
        //         question:{},
        //         timer:this.currentGame.timer,
        //         state:"pregame"
        //     };
        //     console.log(socketObj);
        //     io.sockets.to(room).emit(socketObj);
        // }, 1000);
    }
}

module.exports = GameSession;