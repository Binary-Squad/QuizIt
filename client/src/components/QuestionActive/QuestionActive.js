import React, {Component} from 'react'
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap'
// import {Modal, CustomComponent} from 'react-bootstrap'
//import './question.css'


export default class QuestionActive extends Component {

  render() {

    const {question} = this.props
    console.log(question)
    const answers = question.answers

    return (
      <div className="">
          <Panel>
            <Panel.Heading>{question.question}</Panel.Heading>
            <ListGroup>
              {answers.map(answer => (
                <ListGroupItem onClick={this.props.onAnswer}>{answer}</ListGroupItem>
              ))}
            </ListGroup>
          </Panel>
      </div>
    )
  }
}
