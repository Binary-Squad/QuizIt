import React, {Component} from 'react'
// import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap'
// import {Modal, CustomComponent} from 'react-bootstrap'
import './Timer.css'

export default class Timer extends Component {
  
  render() {

    return (
      <div className="centered">
        <span className="timer centered">
            {this.props.timer} seconds remaining!
        </span>
      </div>
    )
  }
}
