import React, { Component } from "react";
import socket from '../io';
import "./MobileChatroom.css";

import MobileChatMessageArea from "../MobileChatMessageArea";
import ChatInput from "../ChatInput";

class Chatroom extends Component {
  state = {
    user: this.props.user,
    messages:[]
  };

  componentWillMount() {
    socket.on('chatReceive', (chatMsgObj) => {
      console.log('chatReceived');
      console.log(chatMsgObj);
      this.setState({messages:[...this.state.messages, chatMsgObj]},()=>{
        console.log(this.state.messages);
      })
    });
  }

  sendChatMsg = (chatMsgObj) => {
    socket.emit('chatSend', (chatMsgObj));
    this.setState({messages:[...this.state.messages, chatMsgObj]},()=>{
      console.log(this.state.messages);
    })
  }

  render() {
    return (
      <div className="mobile-chatContainer">
        <div className="mobile-chatTitle">
          Chat Room
        </div>
        <div className="mobile-chatMessageAreaHeight">
          <MobileChatMessageArea messages={this.state.messages}> </MobileChatMessageArea>
        </div>
        <div className="mobile-chatInputHeight">
        <ChatInput user={this.props.user} sendChatMsg={this.sendChatMsg}> </ChatInput>
        </div>
      </div>
    );
  }
}

export default Chatroom;