import React, { Component } from 'react';
import io from 'socket.io-client';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
// import isLoggedIn from "./utils/isLoggedIn.js";
import Navbar from "./components/Navbar/";

class App extends Component {

  state = {
    loggedIn:false,
    username:"",
    endpoint: "localhost:3001",
    result: {"response_code":0,"results":[{"category":"Entertainment: Film","type":"multiple","difficulty":"easy","question":"What is the highest grossing film of all time (without adjusting for inflation)?","correct_answer":"Avatar","incorrect_answers":["Jurassic World","Star Wars: The Force Awakens","Titanic"]},{"category":"Entertainment: Board Games","type":"multiple","difficulty":"easy","question":"How many dice are used in the game of Yahtzee?","correct_answer":"Five","incorrect_answers":["Four","Six","Eight"]},{"category":"Entertainment: Music","type":"multiple","difficulty":"easy","question":"Ringo Starr of The Beatles mainly played what instrument?","correct_answer":"Drums","incorrect_answers":["Bass","Guitar","Piano"]},{"category":"Science: Computers","type":"multiple","difficulty":"easy","question":"HTML is what type of language?","correct_answer":"Markup Language","incorrect_answers":["Macro Language","Programming Language","Scripting Language"]},{"category":"Entertainment: Music","type":"multiple","difficulty":"easy","question":"Which member of the Foo Fighters was previously the drummer for Nirvana?","correct_answer":"Dave Grohl","incorrect_answers":["Taylor Hawkins","Nate Mendel","Chris Shiflett"]},{"category":"Entertainment: Japanese Anime & Manga","type":"multiple","difficulty":"easy","question":"What is the last name of Edward and Alphonse in the Fullmetal Alchemist series.","correct_answer":"Elric","incorrect_answers":["Ellis","Eliek","Elwood"]},{"category":"Geography","type":"multiple","difficulty":"easy","question":"Which UK country features a dragon on their flag?","correct_answer":"Wales","incorrect_answers":["England","North Ireland","Scotland"]},{"category":"Entertainment: Film","type":"multiple","difficulty":"easy","question":"What is the oldest Disney film?","correct_answer":"Snow White and the Seven Dwarfs","incorrect_answers":["Pinocchio","Dumbo","Fantasia"]},{"category":"Entertainment: Japanese Anime & Manga","type":"multiple","difficulty":"easy","question":"What year did &quot;Attack on Titan&quot; first air?","correct_answer":"2013","incorrect_answers":["2014","2012","2015"]},{"category":"Entertainment: Music","type":"multiple","difficulty":"easy","question":"Which band recorded the album &quot;Parallel Lines&quot;?","correct_answer":"Blondie","incorrect_answers":["Paramore","Coldplay","The Police"]}]},
    users: [
      {
        username: 'caryn',
        score: 1,
      },
      {
        username: 'joe',
        score: 2,
      },
      {
        username: 'jon',
        score: 3,
      },
      {
        username: 'thomas',
        score: 8,
      },
    ]
  }

  checkIfLoggedIn(){
    if(localStorage.user){
      return true
    }
    else{
      return false
    }
  }

  //temporary clear function for testing socket
  componentWillMount(){
    localStorage.clear();
  }

  // method for emitting a socket.io event
  send = (event, data) => {
    const socket = io.connect(this.state.endpoint);
    socket.emit(event, data);
  }

  // Render method for when state is updated
  render() {

    const socket = io.connect(this.state.endpoint);

    socket.on('connection', (msg) => {
      if (msg === 'a user connected') {
        console.log('a user connected');
      }
      else if (msg === 'a user disconnected') {
        console.log('a user disconnected');
      }
    });

    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/login" render={()=>(this.checkIfLoggedIn()?<Redirect to="/dashboard" />:<Login />)}/>
            <Route exact path="/logout" render={()=>(<Logout />)}/>
            <Route exact path="/register" render={()=>(this.checkIfLoggedIn()?<Redirect to="/dashboard" />:<Register />)}/>
            <Route exact path="/dashboard" render={()=>(this.checkIfLoggedIn()?<Dashboard />:<Redirect to="/login" />)}/>
            <Route path="/" render={() => (
              <Home users={this.state.users} questions={this.state.result.results} />
            )}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
