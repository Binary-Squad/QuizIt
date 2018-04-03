import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      endpoint: "localhost:3001"
    }
  }

  // method for emitting a socket.io event
  send = () => {
    const socket = socketIOClient(this.state.endpoint);

    socket.emit('testSend', 'Client send test');
  }


  // Render method for when state is updated
  render() {

    const socket = socketIOClient(this.state.endpoint);

    socket.on('connection', (msg) => {
      if (msg == 'a user connected') {
        console.log("A user connected");
      }
      else if (msg == 'a user disconnected') {
        console.log("A user disconnected");
      }
    });

    return (
      <div>
        <p>Making sure this works</p>
      </div>
    );
  }
}

export default App;