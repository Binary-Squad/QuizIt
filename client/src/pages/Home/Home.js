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
import CurrentQuestions from "../../components/CurrentQuestions";
import Chatroom from "../../components/Chatroom";
import './Home.css';

class Home extends Component {
  state = {
    loading:true,
    loggedIn: false,
    user:{},
    // username: "",
    // password: "",
    errors:[],
    // endpoint: "localhost:3001",
    gameState: "loading",
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
          res.data.user.id = res.data.user._id;
          setTimeout(()=>{
            this.setState({loggedIn:true,loading:false,user:res.data.user},()=>{
              console.log('loggedIn is '+this.state.loggedIn);
            });
          },1000)
          
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
        },1000)
      })
    }
    else{
      setTimeout(()=>{
        this.setState({loggedIn:false,loading:false},()=>{
          console.log('loggedIn is '+this.state.loggedIn);
        });
      },1000)
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

  loggedInTrue = (userInfo)=>{
    this.setState({loggedIn:true,user:userInfo},()=>{
      console.log('loggedIn '+this.state.loggedIn);
      console.log('user '+this.state.user);
    });
  }

  setAnswer = (answer,questionNum)=>{
    this.setState({currentAnswer:answer,questionNum:questionNum},()=>{
      var answerObj = {
        id: this.state.user.id, //Allow login to update state.id later
        name: this.state.user.name, //Allow login to update state.name later
        answer: this.state.currentAnswer, //True and False are strings as well
        questionNum: this.state.questionNum, //0-9 to match question array position
        timer: this.state.timer, //Time the user selects answer. will be 0 if they switched answers
        room: 'master' //Will be 'master' until multiple rooms
      }
      console.log(answerObj);
      socket.emit('answer',answerObj);
    });
  }

  // Renders game components inside quizitPlayground.
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

  // Renders timer inside quizitPlayground
  renderTimer = ()=>{
    if(this.state.loggedIn){
      return(<Timer timer={this.state.timer}/>)
    }
  }

  // Renders left div. You can render a specific component and pass props like so.
  renderLeft = ()=>{
    if(this.state.loggedIn){
      return(<CurrentQuestions questions={this.state.questions} />)
    }
  }

  // Renders right div. You can render a specific component and pass props like so.
  renderRight = ()=>{
    if(this.state.loggedIn){
      return(<Chatroom user={this.state.user} />)
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row pushDown"></div>
        <div>
          <div className="quizitLeft">
            {this.renderLeft()}
          </div>
          <div className="quizitCenter">
              <div className = "quizitPlayground vh-center">
                <div className="quizitPlaygroundTop">{this.renderStuff()}</div>
                <div className="quizitPlaygroundBottom">{this.renderTimer()}</div>
              </div>
          </div>
          <div className="quizitRight">
            {this.renderRight()}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;