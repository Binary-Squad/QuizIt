import React, {Component} from 'react'
// import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap'
// import {Modal, CustomComponent} from 'react-bootstrap'
import './MobileTimer.css'

export default class MobileTimer extends Component {
  
  render() {

    return (
      <div className="centered mobile-timerBox">
	    <div className="mobile-timer">{this.props.timer}</div>
	    <div className="mobile-timer-bottom">Seconds Remaining</div>
      </div>
    )
  }
}
