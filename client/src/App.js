import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/";
import Navbar from "./components/Navbar";
import Register from "./pages/Register/";
import Logout from "./pages/Logout/";

class App extends Component {
  state = {
    loggedIn: false,
    username: "",
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

  render() {

    return (
      <Router>
        <div>
          <Navbar loggedIn={this.state.loggedIn}/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/logout" component={Logout} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;