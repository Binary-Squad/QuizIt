import React, { Component } from "react";
import socket from '../io';
import "./Chatroom.css";

import ChatMessageArea from "../ChatMessageArea";
import ChatInput from "../ChatInput";

class Chatroom extends Component {
  constructor(props) {
    super(props);
    state: {
      user: props.user
    };
  }

  componentWillMount() {
  }

  sendChatMsg = (chatMsgObj) => {
    this.props.socket.emit('chat', (chatMsgObj));
  }

  render() {
    return (
      <div className="chatContainer">
        <div className="chatTitle">
          Chat Room
        </div>
        <ChatMessageArea socket={this.props.socket}> </ChatMessageArea>
        <ChatInput user={this.props.user} sendChatMsg={this.sendChatMsg}> </ChatInput>
      </div>
    );
  }
}

export default Chatroom;