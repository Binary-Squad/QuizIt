// WARNING: PING MUST BE LESS THAN INTERMISSION * SETINTERVAL. Recommended at least 250 milliseconds less.
// WARNING: PING MUST BE LESS THAN INTERMISSION * SETINTERVAL. Recommended at least 250 milliseconds less.
const timerSettings={
	production:{
		preGame:10, // sets initial timer for preGame phase
		intermission:5, // sets timer for intermission phase
		gameEnd:10, // sets timer for gameEnd phase
		questionActive:10, // sets timer for questionActive phase
		voteInterval:10,
		tickInterval:1000, // sets the timer tick interval
		ping:4000 // sets ping comparing answers
	},
	testing:{
		preGame:2, // sets initial timer for preGame phase
		intermission:2, // sets timer for intermission phase
		gameEnd:2, // sets timer for gameEnd phase
		questionActive:2, // sets timer for questionActive phase
		voteInterval:5,
		tickInterval:1000, // sets the timer tick interval
		ping:1000 // sets ping comparing answers
	}
}
// WARNING: PING MUST BE LESS THAN INTERMISSION * SETINTERVAL. Recommended at least 250 milliseconds less.
// WARNING: PING MUST BE LESS THAN INTERMISSION * SETINTERVAL. Recommended at least 250 milliseconds less.

module.exports = timerSettings;