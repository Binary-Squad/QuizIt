// WARNING: PING MUST BE LESS THAN INTERMISSION * SETINTERVAL. Recommended at least 250 milliseconds less.
// WARNING: PING MUST BE LESS THAN INTERMISSION * SETINTERVAL. Recommended at least 250 milliseconds less.
const timerSettings={
	production:{
		preGame:10, // sets initial timer for preGame phase
		intermission:5, // sets timer for intermission phase
		gameEnd:10, // sets timer for gameEnd phase
		questionActive:10, // sets timer for questionActive phase
		tickInterval:1000, // sets the timer tick interval
		ping:4000 // sets ping comparing answers
	},
	testing:{
		preGame:3, // sets initial timer for preGame phase
		intermission:3, // sets timer for intermission phase
		gameEnd:3, // sets timer for gameEnd phase
		questionActive:15, // sets timer for questionActive phase
		tickInterval:500, // sets the timer tick interval
		ping:250 // sets ping comparing answers
	}
}
// WARNING: PING MUST BE LESS THAN INTERMISSION * SETINTERVAL. Recommended at least 250 milliseconds less.
// WARNING: PING MUST BE LESS THAN INTERMISSION * SETINTERVAL. Recommended at least 250 milliseconds less.

module.exports = timerSettings;