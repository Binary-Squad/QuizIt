import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
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
    endpoint: "https://fierce-oasis-31783.herokuapp.com/"
  }

  checkIfLoggedIn(){
    if(localStorage.user){
      return true
    }
    else{
      return false
    }
  }

  // method for emitting a socket.io event
  send = () => {
    const socket = socketIOClient();

    socket.emit('testSend', 'Client send test');
  }

  // Render method for when state is updated
  render() {

    const socket = socketIOClient();

    socket.on('connection', (msg) => {
      if (msg === 'a user connected') {
        console.log("A user connected");
      }
      else if (msg === 'a user disconnected') {
        console.log("A user disconnected");
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