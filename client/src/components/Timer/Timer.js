import React, {Component} from 'react'
// import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap'
// import {Modal, CustomComponent} from 'react-bootstrap'
import './Timer.css'

export default class Timer extends Component {

  render() {

    return (
      <div>
        <h1 className="centered">Timer</h1>
        <div className="timer">
            {this.props.timer}
        </div>
      </div>
    )
  }
}
