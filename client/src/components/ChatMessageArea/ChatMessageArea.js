import React, { Component } from "react";
import "./ChatMessageArea.css";

class ChatMessageArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            messageList: <li className="listItem"></li>
        }
        this.props.socket.on('chat', (chatMsgObj) => {
            const chatMsg = {
                user: {
                    name: chatMsgObj.user.name
                },
                msg: chatMsgObj.msg
            }
            console.log(chatMsgObj);
            this.state.messages.push(chatMsg);
            this.createMessageList(this.state.messages);
        });
    }

    componentDidMount() {
    }

    createMessageList = (messages) => {
        this.setState({
            messageList: this.state.messages.map((message) => <li className="listItem">{message.user.name + ": " + message.msg}</li>)
        });
    }

    render() {
        return (
            <div className="chatMessageArea">
                <ul>
                    {this.state.messageList}
                </ul>
            </div>
        )
    }

}

export default ChatMessageArea;