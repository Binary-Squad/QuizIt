import React, {Component} from 'react'
import {Modal} from 'react-bootstrap'
import Leaderboard from '../../components/Leaderboard'
import Question from '../../components/Question'
import './home.css'


export default class Home extends Component {
  state = {
    questionIndex: 0
  }

  answerQuestion = event => {
    const currentQuestion = this.props.questions[this.state.questionIndex]

    this.setState({
      questionIndex: this.state.questionIndex + 1,
      correct: currentQuestion.correct_answer === event.target.textContent
    })
  }

  render() {
    const currentQuestion = this.props.questions[this.state.questionIndex]

    return (
      <div class='container'>
        <div>
          <Question question={currentQuestion} onAnswer={this.answerQuestion} />
        </div>
        <div className="static-modal">
          <Modal show={false}>
            <Leaderboard users={this.props.users}/>
          </Modal>
        </div>
      </div>
    )
  }
}
