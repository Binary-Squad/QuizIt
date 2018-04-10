import React, {Component} from 'react'
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap'
// import {Modal, CustomComponent} from 'react-bootstrap'
//import './question.css'


export default class QuestionActive extends Component {

  state={
    questionNum:this.props.questionNum,
    totalQuestions:this.props.totalQuestions,
    timer:this.props.timer,
    selectedAnswer:"",
    timeClicked:0
  }

  componentWillUnmount(){
    if(this.state.selectedAnswer){
      this.props.setAnswer(this.state.selectedAnswer,this.state.questionNum);
    }
  }

  handleClick = (answer)=>{
    console.log('Clicked '+answer);
    this.setState({selectedAnswer:answer});
  }

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
                  answer={answer}
                  onClick={()=>{this.handleClick(answer)}}
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
