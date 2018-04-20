import React, { Component } from "react";
// import Sound from "react-sound";
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
import Navbar from "../../components/Navbar";
import Voting from "../../components/Voting";
import Profile from "../../components/Profile";
import './Home.css';

class Home extends Component {
  state = {
    loading:true,
    loggedIn: false,
    user:{},
    errors:[],
    gameState: "loading",
    question: {},
    currentAnswer:"",
    correctAnswer: "",
    timer:0,
    users:[],
    questionNum:0,
    totalQuestions:0,
    scores:[],
    category: "",
    votingCategories:[]
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
          category:msg.category,
          votingCategories:msg.votingCategories
        },()=>{
          console.log(this.state.votingCategories);
        });
      }
    });
  }

  componentWillUpdate(nextProps, nextState){
    if(nextState.gameState === "pregame" && this.state.gameState != "pregame"){
      this.setState({answers:[],gameState:"pregame"});
      console.log('cleared answers upon newGame AKA pregame');
    }
    if(nextState.gameState !== this.state.gameState){
      API.getProfileInfo(localStorage.jwt).then(res=>{
        this.setState({user:res.data.user})
      })
    }
  }

  loggedInTrue = (userInfo)=>{
    this.setState({loggedIn:true,user:userInfo},()=>{
      console.log('loggedIn '+this.state.loggedIn);
      console.log('user '+this.state.user);
    });
  }

  setAnswer = (answer)=>{
    this.setState({currentAnswer:answer},()=>{
      var answerObj = {
        id: this.state.user._id, //Allow login to update state.id later
        username: this.state.user.username, //Allow login to update state.name later
        answer: this.state.currentAnswer, //True and False are strings as well
        questionNum: this.state.questionNum, //0-9 to match question array position
        timer: this.state.timer, //Time the user selects answer. will be 0 if they switched answers
        room: 'master', //Will be 'master' until multiple rooms
        answered: true
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
                gameState={this.state.gameState}
              />
            )
          }
          else if(this.state.gameState === 'intermission'){
            return(
              <QuestionActive
                question={this.state.question}
                correctAnswer={this.state.correctAnswer} 
                questionNum={this.state.questionNum}
                totalQuestions={this.state.totalQuestions}
                currentAnswer={this.state.currentAnswer}
                timer={this.state.timer}
                category={this.state.category}
                gameState={this.state.gameState}
              />
            )
          }
          else if(this.state.gameState === 'gameEnd'){
            return(
              <GameEnd scores={this.state.scores} />
            )
          }
          else if(this.state.gameState === 'voting'){
            return(
              <Voting 
                votingCategories={this.state.votingCategories}
                userId={this.state.user.id}
              />
            )
          }
          else if(this.state.gameState === 'loading'){
            console.log(this.state.gameState);
            return(
              <Loading />
            )
          }
        }
      }
  }

  // Renders timer inside quizitPlayground
  renderTimer = ()=>{
    if(this.state.loggedIn){
      if(this.state.gameState!='loading'){
        return(<Timer timer={this.state.timer} gameState={this.state.gameState}/>)
      }
    }
  }

  // Renders left div. You can render a specific component and pass props like so.
  renderLeft = ()=>{
    if(this.state.loggedIn){
      return(<Profile user={this.state.user} />)
    }
  }

  // Renders right div. You can render a specific component and pass props like so.
  renderRight = ()=>{
    if(this.state.loggedIn){
      return(<Chatroom user={this.state.user} socket={socket}/>)
    }
  }

  handleSongLoading = ()=>{
    console.log('loading');
  }

  handleSongPlaying = ()=>{
    console.log('playing');
  }

  handleSongFinishedPlaying = ()=>{
    console.log('finishedPlaying');
  }

  render() {
    return (
      <div>
        <Navbar loggedIn={this.state.loggedIn}/>
          <div className="container-fluid">
            <div className="row pushDown"></div>
            <div className="row">
              <div className="col col-lg-2 quizitLeft">
                {this.renderLeft()}
              </div>
              <div className="col col-lg-8 quizitCenter">
                  <div className = "quizitPlayground vh-center">
                    <div className="quizitPlaygroundTop">{this.renderStuff()}</div>
                    <div className="quizitPlaygroundBottom">{this.renderTimer()}</div>
                  </div>
              </div>
              <div className="col col-lg-2 quizitRight">
                {this.renderRight()}
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Home;

// <Sound
//           url="/assets/sound/BlueSkies.mp3"
//           playStatus={Sound.status.PLAYING}
//           // playFromPosition={0 /* in milliseconds */}
//           onLoading={this.handleSongLoading}
//           onPlaying={this.handleSongPlaying}
//           onFinishedPlaying={this.handleSongFinishedPlaying}
//           />