const Game = require('./game');
const mongoose = require('mongoose');
const Session = require('../models/gameSession');
const axios = require('axios');
const triviaAPI = require('../utils/triviaAPI');

function GameSession(io) {
    // The current active game's id
    this.activeGame = undefined;
    // Array that stores the userIds of all users within this game session
    this.users = [];
    // Variable that we will instantiate each new game into
    this.currentGame = undefined;
    // Variable for storing the session's ID
    this._id = undefined;
    // Variable for storign the session's type. 
    this.type = undefined;
    

    // Method that sets up the session's state
    this.create = () => {
        this.createNewGame();
    };

    // Method that adds a user to the session
    this.addUser = (user)=>{
        // REPLACE the key value with the user object's id.
        this.users.push(user);
    };

    // Method for removing a user from the session by userId
    this.remUser = (userId) => {
        // NEED TO WRITE THIS
    };

    // Method for saving the session to MongoDB
    this.save = (cb) => {
        const sessionDocument = new Session({
            users: this.users,
            currentGame: this.currentGame,
            type: this.type,
            _id: this._id
        });
        sessionDocument.save().then((res) => {
            this._id = res._id;
            cb(res);
        });
    };

    // Creating a new game
    this.createNewGame = () => {
        let gameSettings = {
            numQuestions: 10,
            category: 0,
            difficulty: 'Any',
            type: 'Multiple'
        }

        triviaAPI(res => {
            let newGame = new Game(res.data.results, this.users, gameSettings, io);
            this.currentGame=newGame;
            newGame.initializeGame();
            console.log('--------------------------------------------------');
        });
    };
}

module.exports = GameSession;