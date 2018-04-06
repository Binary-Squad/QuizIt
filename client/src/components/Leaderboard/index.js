import React, {Component} from 'react'
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap'
import './leaderboard.css'


export default class Leaderboard extends Component {
  render() {
    return (
      <Panel>
        <Panel.Heading>Leaderboard</Panel.Heading>
        <ListGroup>
          <ListGroupItem>Person 1</ListGroupItem>
          <ListGroupItem>Person 2</ListGroupItem>
          <ListGroupItem>Person 3</ListGroupItem>
        </ListGroup>
      </Panel>
    )
  }
}
