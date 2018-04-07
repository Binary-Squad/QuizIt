import React, { Component } from 'react';
import io from 'socket.io-client';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
// import isLoggedIn from "./utils/isLoggedIn.js";
import Navbar from "./components/Navbar";

class App extends Component {
  constructor() {
    super()
  }

  state = {
    loggedIn:false,
    username:"",
    endpoint: "localhost:3001"
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
            <Route path="/" render={()=>(<Home />)}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;