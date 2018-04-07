const Questions = require('../config/test-data');
const axios = require('axios');

function Game (questions,io){
    // Array that stores the userIds of all users within this game session
    this.timer = 180;
    // questions for the current game
    this.startingTimer;
    this.questions = questions;
    // id of game
    this._id = undefined;
    this.create = ()=>{
        // this.startTimer();
    };

    // this.startTimer = (io)=>{
    //     console.log('starting timer');
    //     io.to('master').emit('hello from master! game is starting!');
    // };
}

module.exports = Game;