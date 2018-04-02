import React, { Component } from "react";
import API from "../../utils/API";
import {Redirect} from "react-router-dom";
// import Navbar from "../../components/Navbar";

class Register extends Component {
  state = {
    name: "",
    username: "",
    email: "",
    password: "",
    password2: ""
  };

  handleInputChange = event => {
    console.log('derp');
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    API.registerUser(this.state).then(res=>{
      console.log(res);
      this.setState({redirectToLogin:true});
    }).catch(err => console.log(err));
  };

  render() {
    if(this.state.redirectToLogin){
      return(<Redirect to="/login" />)
    }
    return (
      <div>

        <div className="container">
          <p className="max-center">Register</p>
          <form>
            <div>
            <input 
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              placeholder="name"
            />
            <div>
            </div>
            <input 
              name="username"
              onChange={this.handleInputChange}
              value={this.state.username}
              placeholder="username"
            />
            <div>
            </div>
            <input 
              name="email"
              onChange={this.handleInputChange}
              value={this.state.email}
              placeholder="email"
            />
            <div>
            </div>
            <input 
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
              placeholder="password"
              type="password"
            />
            <div>
            </div>
            <input 
              name="password2"
              onChange={this.handleInputChange}
              value={this.state.password2}
              placeholder="password2"
              type="password"
            />
            </div>
            <button onClick={this.handleFormSubmit}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
