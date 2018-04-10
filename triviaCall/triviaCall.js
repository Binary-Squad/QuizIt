const axios = require('axios');
<<<<<<< HEAD
const defaultTrivCall = "https://opentdb.com/api.php?amount=2&category=9&type=multiple";
=======
const defaultTrivCall = "https://opentdb.com/api.php?amount=10&type=multiple";
>>>>>>> 2b5a9d7f810449dfb05c9beffd02cfed50a0c757

function triviaCall(cb){
axios.get(defaultTrivCall)
  .then((response) => {
    cb(response);
    response.push(response);
  })
  .catch(function (error) {
    console.log(error);
  });



module.exports = triviaCall;