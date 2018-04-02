import React, { Component } from "react";
import API from "../../utils/API";
import {Redirect} from "react-router-dom";

class Login extends Component {
  state = {
    loggedIn:false,
    username: "",
    password: ""
  };

  componentWillMount() {
    // if(localStorage.user){
    //   this.setState({loggedIn:true});
    // }
  }

  handleInputChange = event => {
    // console.log('derp');
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    API.authenticateUser(this.state).then(res=>{
      console.log(res);
      localStorage.setItem('jwt',res.data.token);
      localStorage.setItem('user',JSON.stringify(res.data.user));
      this.setState({redirectToDashboard:true})
    }).catch(err => console.log(err));
  };


  render() {
    if(this.state.redirectToDashboard){
      return(<Redirect to="/dashboard" />)
    }
    return (
      <div>
        <div className="container">
        <p className="max-center">Login</p>
        <form>
          <div>
            <input 
              name="username"
              onChange={this.handleInputChange}
              value={this.state.username}
              placeholder="username"
            />
          </div>
          <div>
            <input 
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
              placeholder="password"
              type="password"
            />
          </div>
          <button onClick={this.handleFormSubmit}>Login</button>
        </form>
        </div>
      </div>
    );
  }
}

export default Login;
