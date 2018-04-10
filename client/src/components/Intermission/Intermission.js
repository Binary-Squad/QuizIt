import React, {Component} from 'react'
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap'
// import {Modal, CustomComponent} from 'react-bootstrap'
import './Intermission.css'


export default class Intermission extends Component {

  state={
    timer:this.props.timer
  }

  render() {

    const {question} = this.props
    const answers = question.answers

    return (
      <div className="">
          <Panel>
            <Panel.Heading className="centered">{question.question}</Panel.Heading>
            <ListGroup>
              {answers.map(answer => (
                <ListGroupItem
                  key={answer}
                  className={
                    this.props.currentAnswer === this.props.correctAnswer && answer === this.props.correctAnswer ? "correct centered" :
                    answer === this.props.correctAnswer ? "correctAnswer centered" : 
                    answer === this.props.currentAnswer ? "incorrect centered" : "centered"
                  }
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
