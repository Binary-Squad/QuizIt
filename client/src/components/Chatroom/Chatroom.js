import React, { Component } from "react";
import "./Chatroom.css";

class Chatroom extends Component {

  componentWillMount(){
  }

  state = {
    user:this.props.user
  };

  render() {
    return (
      <div>
        Chatroom
      </div>
    );
  }
}

export default Chatroom;