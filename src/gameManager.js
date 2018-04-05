const GameSession = require('./gameSession');

const gameManager = {
    activeSessions: {},

    // Method for creating a new session using the gameSession class
    createSession() {
        console.log("Attempting to create a new session");
        // Instantiate a new session class
        let newSession = new GameSession;
        // Call the new session's create method to setup the session
        newSession.create();
        // Push the new session variable to gameManager's activeSessions key
        this.addSession(newSession);
    },

    // Method for adding the session to the list of activeSessions
    addSession(newSession) {
        // Add the session to the activeSessions list
        this.activeSessions[newSession.id] = newSession;
        // Save the session to MongoDB
        newSession.save();

        console.log("New session " + newSession.id + " created and added to activeSessions");
        console.log("Current sessions:");
        console.log(this.activeSessions);
        
    }
}

module.exports = gameManager;