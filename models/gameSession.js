const mongoose = require('mongoose');

const GameSessionSchema = mongoose.Schema({
    users: {
        type: Array
    },
    currentGame: {
        type: Object
    },
    id: {
        type: String
    },
    type: {
        type: String
    },
    games: {
        type: Array
    }
});

const Session = module.exports = mongoose.model('Session', GameSessionSchema);