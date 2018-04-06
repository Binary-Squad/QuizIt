import React, {Component} from 'react'
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap'
import './question.css'


export default class Leaderboard extends Component {
  render() {
    return (
      <Panel>
        <Panel.Heading>Question</Panel.Heading>
        <ListGroup>
          <ListGroupItem>Answer 1</ListGroupItem>
          <ListGroupItem>Answer 2</ListGroupItem>
          <ListGroupItem>Answer 3</ListGroupItem>
        </ListGroup>
      </Panel>;
    )
  }
}
