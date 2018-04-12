import React, { Component } from "react";
import API from "../../utils/API";
// import {Redirect} from "react-router-dom";
import socket from '../../components/io';
import Login from '../../components/Login';
import Pregame from '../../components/Pregame';
import QuestionActive from '../../components/QuestionActive';
import Intermission from '../../components/Intermission';
import GameEnd from '../../components/GameEnd';
import Timer from '../../components/Timer';
import Loading from "../../components/Loading";
// import './Home.css';

class Home extends Component {
  state = {
    loading:true,
    loggedIn: false,
    username: "",
    password: "",
    errors:[],
    endpoint: "localhost:3001",
    gameState: "pregame",
    question: {},
    currentAnswer:"",
    // answers: [],
    correctAnswer: "",
    timer:0,
    users:[],
    questionNum:0,
    totalQuestions:0,
    scores:[],
    category: ""
  };

  componentWillMount() {
    if(localStorage.jwt){
      API.getProfileInfo(localStorage.jwt).then(res=>{
          console.log(res);
          setTimeout(()=>{
            this.setState({loggedIn:true,loading:false},()=>{
              console.log('loggedIn is '+this.state.loggedIn);
            });
          },2000)
          
          var socketParams = {
            user:res.data.user,
            room:'master'
          }
          socket.emit('loggedIn',socketParams);
        }
      ).catch(err=>{
        console.log(err);
        setTimeout(()=>{
          this.setState({loggedIn:false,loading:false},()=>{
            console.log('loggedIn is '+this.state.loggedIn);
          });
        },2000)
      })
    }
    else{
      setTimeout(()=>{
        this.setState({loggedIn:false,loading:false},()=>{
          console.log('loggedIn is '+this.state.loggedIn);
        });
      },2000)
    }
  }

  componentDidMount(){
    // socket.on('message', (msg) => {
    //   console.log(msg);
    // });

    //Used for yarn start
    socket.on('gameState', (msg) => {
      // console.log(msg);
      //Sets gameState based on response. Sets timer. Sets questions and correctAnswer when applicable.
      this.setState({timer:msg.timer});
      if(this.state.gameState !== msg.gameState){
        this.setState({
          gameState:msg.gameState,
          question:msg.question,
          correctAnswer:msg.correctAnswer,
          questionNum:msg.questionNum,
          totalQuestions:msg.totalQuestions,
          scores:msg.scores,
          category:msg.category
        });
      }
    });    
  }

  componentWillUpdate(nextProps, nextState){
    if(nextState.gameState === "pregame" && this.state.gameState != "pregame"){
      this.setState({answers:[],gameState:"pregame"});
      console.log('cleared answers upon newGame AKA pregame');
    }
  }

  loggedInTrue = ()=>{
    this.setState({loggedIn:true},()=>{
      console.log('loggedIn true!');
    });
  }

  setAnswer = (answer,questionNum)=>{
    this.setState({currentAnswer:answer,questionNum:questionNum},()=>{
      var answerObj = {
        id: JSON.parse(localStorage.user).id, //Allow login to update state.id later
        name: JSON.parse(localStorage.user).name, //Allow login to update state.name later
        answer: this.state.currentAnswer, //True and False are strings as well
        questionNum: this.state.questionNum, //0-9 to match question array position
        timer: this.state.timer, //Time the user selects answer. will be 0 if they switched answers
        room: 'master' //Will be 'master' until multiple rooms
      }
      console.log(answerObj);
      socket.emit('answer',answerObj);
    });
  }

  renderStuff = ()=>{
      if(this.state.loading){
        return(<Loading />)
      }
      else{
        if(!this.state.loggedIn){
          return(
            <Login loggedInTrue={this.loggedInTrue}/>
          )
        }
        else{
          if(this.state.gameState === 'pregame'){
            return(
              <Pregame />
            )
          }
          else if(this.state.gameState === 'questionActive'){
            return(
              <QuestionActive
                question={this.state.question}
                questionNum={this.state.questionNum}
                totalQuestions={this.state.totalQuestions}
                setAnswer={this.setAnswer}
                timer={this.state.timer}
                category={this.state.category}
              />
            )
          }
          else if(this.state.gameState === 'intermission'){
            return(
              <Intermission
                question={this.state.question}
                correctAnswer={this.state.correctAnswer} 
                questionNum={this.state.questionNum}
                totalQuestions={this.state.totalQuestions}
                currentAnswer={this.state.currentAnswer}
                timer={this.state.timer}
                category={this.state.category}
              />
            )
          }
          else if(this.state.gameState === 'gameEnd'){
            return(
              <GameEnd scores={this.state.scores} />
            )
          }
        }
      }
  }

  renderTimer = ()=>{
    if(this.state.loggedIn){
      return(<Timer timer={this.state.timer}/>)
    }
  }

  // {this.state.loggedIn?<Timer timer={this.state.timer}/>:""}

  render() {
    return (
      <div className = "container poop mainContainer">
        {this.renderStuff()}
        {this.renderTimer()}
      </div> 
    );
  }

}

export default Home;


 // !this.state.loggedIn?<Login loggedInTrue={this.loggedInTrue}/>:
 //            this.state.gameState==='pregame'?<Pregame />:
 //            this.state.gameState==='questionActive'? 
 //              <QuestionActive
 //                question={this.state.question}
 //                questionNum={this.state.questionNum}
 //                totalQuestions={this.state.totalQuestions}
 //                setAnswer={this.setAnswer}
 //                timer={this.state.timer}
 //                category={this.state.category}
 //              />
 //              // <Timer timer={this.state.timer}/>
 //            : this.state.gameState==='intermission'? 
 //              <Intermission
 //                question={this.state.question}
 //                correctAnswer={this.state.correctAnswer} 
 //                questionNum={this.state.questionNum}
 //                totalQuestions={this.state.totalQuestions}
 //                currentAnswer={this.state.currentAnswer}
 //                timer={this.state.timer}
 //                category={this.state.category}
 //              />
 //              // <Timer timer={this.state.timer}/>
 //            : this.state.gameState==='gameEnd'?
 //              <GameEnd scores={this.state.scores} />
 //              // <Timer timer={this.state.timer}/>
 //              :""

// {
//     uid: mongoDBuser._id, 
//     answers: string, //True and False are strings as well
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