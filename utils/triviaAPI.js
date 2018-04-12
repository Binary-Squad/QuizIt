const axios = require('axios');

const triviaAPI = (cb)=>{
	axios.get('https://opentdb.com/api.php?amount=5&type=multiple')
								//  ^^^^^^ should be 10 questions
		.then(res=>{
			cb(res);
		})
		.catch(err=>{
			throw err;
		})
}

module.exports = triviaAPI;