const GameSession = require('./gameSession');
const mongoose = require('mongoose');
const Session = require('../models/gameSession');

const gameManager = {
    activeSessions: {},

    // Method for creating a new session using the gameSession class
    createSession(sessionType) {
        console.log("Attempting to create a new session");
        // Instantiate a new session class
        let newSession = new GameSession;
        // Call the new session's create method to setup the session
        newSession.create();
        // Push the new session variable to gameManager's activeSessions key
        this.addSession(newSession,sessionType);
    },

    // Method for adding the session to the list of activeSessions
    addSession(newSession,type) {
        // Add the session to the activeSessions list
        // Check if this is a master lobby or regular one
        if (type === 'master') {
            this.activeSessions['master'] = newSession;
            newSession.save();
            // this.logSessions('master');
            this.logThis()
        }
        else {
            // Mongoose function to create a private room
            newSession.save((res)=>{
                this.activeSessions[res._id] = newSession;
                // this.logSessions(res._id);
                this.logThis();
            });
        }
        // Save the session to MongoDB

    },
    logSessions(sessionName){
        console.log("New session " + sessionName + " created and added to activeSessions");
        console.log("Current sessions:");
        console.log(this.activeSessions);
    },
    logThis(){
        console.log(this);
    }
}

module.exports = gameManager;