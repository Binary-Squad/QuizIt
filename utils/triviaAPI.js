const axios = require('axios');

const triviaAPI = (cb)=>{
	axios.get('https://opentdb.com/api.php?amount=10&type=multiple')

		.then(res=>{
			cb(res);
		})
		.catch(err=>{
			throw err;
		})
}


triviaAPI((res)=>{console.log(res.data)})
// module.exports = triviaAPI;