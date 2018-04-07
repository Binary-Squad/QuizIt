const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
    id: {
        type: String
    },
    users: {
        type: Array
    },
    currentQuestion: {
        type: Object
    },
    userAnswers: {
        type: Object
    }
});

const Game = module.exports = mongoose.model('Game', GameSchema);