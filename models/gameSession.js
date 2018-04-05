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
    }
});

const Session = module.exports = mongoose.model('Session', GameSessionSchema);