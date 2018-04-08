import React, { Component } from "react";
// import API from "../../utils/API";
// import {Redirect} from "react-router-dom";
import socket from '../../components/io';
import Login from '../../components/Login';
import Pregame from '../../components/Pregame';
import QuestionStart from '../../components/QuestionStart';
import QuestionEnd from '../../components/QuestionEnd';
import RoundEnd from '../../components/RoundEnd';

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
    timer:0
  };

  componentWillMount() {
  }

  componentDidMount(){
    socket.on('message', (msg) => {
      console.log(msg);
    });
    socket.on('roomState', (msg) => {

      console.log(msg);
      //Sets gameState based on response. Sets timer. Sets questions and correctAnswer.
      this.setState({timer:msg.timer});
      if(this.state.gameState !== msg.state){
        this.setState({gameState:msg.state,question:msg.question,correctAnswer:msg.question.correct_answer}, ()=>{
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
          this.state.gameState==='questionStart'?<QuestionStart />:
          this.state.gameState==='questionEnd'?<QuestionEnd />:
          this.state.gameState==='roundEnd'?<RoundEnd />:""
          }
      </div>
    );
  }

}

export default Home;