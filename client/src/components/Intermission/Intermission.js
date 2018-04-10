import React, {Component} from 'react'
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap'
// import {Modal, CustomComponent} from 'react-bootstrap'
import './Intermission.css'


export default class Intermission extends Component {

  render() {

    const {question} = this.props
    const answers = question.answers

    return (
      <div className="">
          <Panel>
            <Panel.Heading>{question.question}</Panel.Heading>
            <ListGroup>
              {answers.map(answer => (
                <ListGroupItem
                  key={answer}
                  className={answer === this.props.correctAnswer ? "correct" : ""}
                >
                  {answer}
                </ListGroupItem>
              ))}
            </ListGroup>
          </Panel>
      </div>
    )
  }
}
