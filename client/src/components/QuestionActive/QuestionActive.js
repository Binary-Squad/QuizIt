import React, {Component} from 'react';
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import QuestionTracker from '../QuestionTracker';
// import {Modal, CustomComponent} from 'react-bootstrap'
import './questionActive.css';


export default class QuestionActive extends Component {

  state={
    questionNum:this.props.questionNum,
    totalQuestions:this.props.totalQuestions,
    timer:this.props.timer,
    selectedAnswer:"",
    timeClicked:0,
    activeIndex: -1,
  }

  componentWillUnmount(){
    // if(this.state.selectedAnswer){
    //   this.props.setAnswer(this.state.selectedAnswer,this.state.questionNum);
    // }
  }

  handleClick = (answer,index)=>{
    console.log('Clicked '+answer);
    this.setState({selectedAnswer:answer,activeIndex:index},()=>{
      console.log('active index '+index);
    });
    this.props.setAnswer(answer,this.state.questionNum);
  }

  render() {

    const {question} = this.props
    const answers = question.answers

    return (
      <div className="">
          <Panel className="questionList">
            <Panel.Heading className="centered question-text">{question.question}</Panel.Heading>
            <ListGroup>
              {answers.map((answer,index)=> (
                <ListGroupItem 
                  key={answer}
                  answer={answer}
                  index={index}
                  onClick={()=>{this.handleClick(answer,index)}}
                  className={index === this.state.activeIndex ? "currentAnswer":null}
                >
                  {answer}
                </ListGroupItem>
              ))}
            </ListGroup>
            <QuestionTracker questionNum={this.props.questionNum} totalQuestions={this.props.totalQuestions}> </QuestionTracker>
          </Panel>
      </div>
    )
  }
}
