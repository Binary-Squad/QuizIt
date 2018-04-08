import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/";
import Navbar from "./components/Navbar";

class App extends Component {
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

  // Render method for when state is updated
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;