import React, { Component } from "react";
// import API from "../../utils/API";
// import {Redirect} from "react-router-dom";
import socket from '../../components/io';
import Login from '../../components/Login';
import Pregame from '../../components/Pregame';
import QuestionActive from '../../components/QuestionActive';
import Intermission from '../../components/Intermission';
import GameEnd from '../../components/GameEnd';

class Home extends Component {
  state = {
    loggedIn:false,
    username: "",
    password: "",
    errors:[],
    endpoint: "localhost:3001",
    gameState: "pregame",
    question: {},
    answer: "",
    correctAnswer: "",
    timer:0,
    users:[]
  };

  componentWillMount() {
  }

  componentDidMount(){
    // socket.on('message', (msg) => {
    //   console.log(msg);
    // });

    // //Used for yarn start-reactDev
    // socket.on('roomState-test', (msg) => {
    //   console.log(msg);
    //   //Sets gameState based on response. Sets timer. Sets questions and correctAnswer when applicable.
    //   this.setState({timer:msg.timer});
    //   if(this.state.gameState !== msg.state){
    //     this.setState({gameState:msg.state,question:msg.question,correctAnswer:msg.question.correct_answer}, ()=>{
    //       console.log(this.state.question);
    //       console.log("this.state.gameState changed to "+this.state.gameState);
    //       console.log("this.state.correctAnswer changed to "+this.state.correctAnswer);
    //     })
    //   }
    // });

    //Used for yarn start
    socket.on('gameState', (msg) => {

      console.log(msg);
      //Sets gameState based on response. Sets timer. Sets questions and correctAnswer when applicable.
      this.setState({timer:msg.timer});
      if(this.state.gameState !== msg.gameState){
        this.setState({gameState:msg.gameState,question:msg.question,correctAnswer:msg.correctAnswer}, ()=>{
          console.log(this.state.question);
          console.log("this.state.gameState changed to "+this.state.gameState);
          console.log("this.state.correctAnswer changed to "+this.state.correctAnswer);
        })
      }
    });    
  }

  setHomeState(msg){
    this.setState({gameState:msg.state},()=>{
      console.log("this.state.gameState changed to "+msg.state);
    })
  }

  loggedInTrue(){
    console.log('loggedIn true!');
    this.setState({loggedIn:true});
  }

  render() {
    return (
      <div className = "container">
        {!this.state.loggedIn?<Login loggedInTrue={this.loggedInTrue.bind(this)} setHomeState={this.setHomeState.bind(this)} />:
          this.state.gameState==='pregame'?<Pregame />:
          this.state.gameState==='questionActive'? (
            <QuestionActive
              question={this.state.question}
              correctAnswer={this.state.correctAnswer}
            />
          ) : this.state.gameState==='intermission'?(
            <Intermission
              question={this.state.question}
              correctAnswer={this.state.correctAnswer} 
            />
          ) : this.state.gameState==='gameEnd'?
            <GameEnd />
            :null
        }
      </div>
    );
  }

}

export default Home;

// {
//     uid: mongoDBuser._id, 
//     answer: string, //True and False are strings as well
//     num: 4, //0-9 to match question array position
//     timer: 3, //Time the user selects answer. will be 0 if they switched answers
//     room: string //Will be 'master' until multiple rooms
// }
// //react sending mechanism
// this.socket.emit('answer',answerObj);
// //potential server receiving mechanism
// socket.on('answer', function(answerObj){
//   gameManager.activeSessions[answerObj.room].currentGame.updateAnswer(answerObj);
// })