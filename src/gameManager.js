const GameSession = require('./gameSession');

const gameManager = {
    activeSessions: {},

    // Method for creating a new session using the gameSession class
    createSession() {
        console.log("Attempting to create a new session");
        // Instantiate a new session class
        let session = new GameSession;
        // Call the new session's create method to setup the session
        session.create();
        // Push the new session variable to gameManager's activeSessions key
        this.addSession(session);
        
    },

    // Method for adding the session to the list of activeSessions
    addSession(session) {
        this.activeSessions[session.id] = session;
        console.log("New session " + session.id + " created and added to activeSessions");
        console.log("Current sessions:");
        console.log(this.activeSessions);
    }
}

module.exports = gameManager;