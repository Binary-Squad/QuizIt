const axios = require('axios');

const triviaAPI = (cb,cb2)=>{
	axios.get('https://opentdb.com/api.php?amount=10&type=multiple')
								//  ^^^^^^ should be 10 questions
		.then(res=>{
			if(cb){
				cb(res);
			}
		})
		.catch(err=>{
			if(cb2){
				cb2();
			}
			throw err;
		})
}

module.exports = triviaAPI;