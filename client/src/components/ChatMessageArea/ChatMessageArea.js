import React, { Component } from "react";
import "./ChatMessageArea.css";
import socket from '../io';

class ChatMessageArea extends React.Component {

    componentWillMount() {
        // socket.on('chatReceive', (chatMsgObj) => {
        //     console.log(chatMsgObj);
        // });
    }

    // createMessageList = (messages) => {
    //     this.setState({
    //         messageList: this.state.messages.map((message) => <li className="listItem">{message.user.name + ": " + message.msg}</li>)
    //     });
    // }

    render() {
        return (
            <div className="chatMessageArea">
                <ul>
                    {this.props.messages.map((message,index)=><li key={index} className="listItem">{message.user.name + ": " + message.msg}</li>)}
                </ul>
            </div>
        )
    }

}

export default ChatMessageArea;