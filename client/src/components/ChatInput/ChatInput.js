import React, { Component } from "react";
import ReactDOM from "react-dom";
import socket from '../io';
import "./ChatInput.css";

import ChatButton from "../ChatButton";

class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            msg: ''
        };
    }

    createChatObj = () => {
        const chatMsgObj = {
            user: this.props.user,
            msg: this.state.msg
        }
        this.props.sendChatMsg(chatMsgObj);
        console.log(chatMsgObj);
        this.setState({
            msg: ''
        });
        return false;
    }

    handleTextAreaChange = (event) => {
        console.log(event.target.value);
        this.setState({
            msg: event.target.value
        });
    }

    render() {
        return (
            <div className="chatTextArea">
                <form>
                    <div className="form-group">
                        <textarea className="form-control" id="chat-text" rows="3" value={this.state.msg} onChange={this.handleTextAreaChange}></textarea>
                        <ChatButton sendChatMsg={this.createChatObj}> </ChatButton>
                    </div>
                </form>
            </div>
        )
    }

}

export default ChatInput;