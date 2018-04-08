const axios = require('axios');
const defaultTrivCall = "https://opentdb.com/api.php?amount=2&category=9&type=multiple";
const reply = [];

function triviaCall(cb){
axios.get(defaultTrivCall)
  .then((response) => {
    cb(response);
    response.push(response);
  })
  .catch(function (error) {
    console.log(error);
  });

}

function grabQuestion(response){
	console.log(reply);
	console.log("made it");
}

triviaCall();
grabQuestion(response);

// module.exports = grabQuestion;
// module.exports = triviaCall;