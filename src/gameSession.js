const Game = require('./game');
const mongoose = require('mongoose');
const Session = require('../models/gameSession');

class GameSession {
    constructor() {
        // Array that stores the userIds of all users within this game session
        this.users = [];
        // Variable that we will instantiate each new game into
        this.currentGame = undefined;
        // Variable for storing the session's ID
        this.id = undefined;
    }

    // Method that sets up the session's state
    create() {
        // NEED code to create a new session document in Mongo and return the objectId
        
        // Set the session's id based on the id from MongoDB.
        // CURRENTLY PLACEHOLDER VALUES FOR TESTING
        this.id = 1010201;
        this.addUser('User Object To Go Here');
    }

    // Method that adds a user to the session
    addUser(user) {
        // REPLACE the key value with the user object's id.
        this.users.push(user);
    }

    // Method for removing a user from the session by userId
    remUser(userId) {
        // NEED TO WRITE THIS
    }

    // Method for saving the session to MongoDB
    save() {
        const sessionDocument = new Session({
            users: this.users,
            currentGame: this.currentGame,
            id: this.id
        });

        sessionDocument.save().then(() => console.log('Session ' + this.id + ' saved to Mongo'));
    }
}

module.exports = GameSession;