const axios = require('axios');
const defaultTrivCall = 'https://opentdb.com/api.php?amount=10';

const triviaAPI = (cb)=>{
<<<<<<< HEAD
	// Categories chosen by user append axios get.
		const p = "&";
		const e = "=";
		const c = "category";
	if (catBtnFilm.value == "on"){
		const filmbtn = "11";
		defaultTrivCall.concat(p, c, e, filmbtn);
	};
	// remaining parameters
	axios.get(defaultTrivCall)
=======
	axios.get('https://opentdb.com/api.php?amount=10&type=multiple')
>>>>>>> 2b5a9d7f810449dfb05c9beffd02cfed50a0c757
		.then(res=>{
			cb(res);
		})
		.catch(err=>{
			throw err;
		})
}




triviaAPI((res)=>{console.log(res.data)})
// module.exports = triviaAPI;