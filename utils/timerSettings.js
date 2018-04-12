// WARNING: PING MUST BE LESS THAN TICKINTERVAL!
// WARNING: PING MUST BE LESS THAN TICKINTERVAL!
const timerSettings={
	production:{
		preGame:10, // sets initial timer for preGame phase
		intermission:5, // sets timer for intermission phase
		gameEnd:10, // sets timer for gameEnd phase
		questionActive:10, // sets timer for questionActive phase
		ping:250, // sets ping comparing answers. PING MUST BE LESS THAN TICKINTERVAL
		tickInterval:1000 // sets the timer tick interval. TICK INTERVAL MUST BE GREATER THAN PING
	},
	testing:{
		preGame:5, // sets initial timer for preGame phase
		intermission:3, // sets timer for intermission phase
		gameEnd:10, // sets timer for gameEnd phase
		questionActive:5, // sets timer for questionActive phase
		ping:200, // sets ping comparing answers. PING MUST BE LESS THAN TICKINTERVAL
		tickInterval:500 // sets the timer tick interval. TICK INTERVAL MUST BE GREATER THAN PING
	}
}
// WARNING: PING MUST BE LESS THAN TICKINTERVAL!
// WARNING: PING MUST BE LESS THAN TICKINTERVAL!

module.exports = timerSettings;