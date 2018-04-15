import React, {Component} from 'react';
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import QuestionTracker from '../QuestionTracker';
import Timer from '../Timer';
// import {Modal, CustomComponent} from 'react-bootstrap'
import './questionActive.css';

function createMarkup(string){
  return {__html: string};
}

export default class QuestionActive extends Component {

  state={
    questionNum:this.props.questionNum,
    totalQuestions:this.props.totalQuestions,
    timer:this.props.timer,
    category: this.props.category,
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

    // {question.question.replace(/&quot;/g, '\"').replace(/&#039;/g, '\'')}

    return (
      <div className="">
          <div className="centered questionNum-text">Question Number: {this.state.questionNum}/{this.state.totalQuestions}</div>
          <div className="centered question-text" dangerouslySetInnerHTML={createMarkup(question.question)}/>
          <ListGroup>
            {answers.map((answer,index)=> (
              <ListGroupItem 
                key={answer}
                answer={answer}
                index={index}
                onClick={()=>{this.handleClick(answer,index)}}
                className={index === this.state.activeIndex ? "currentAnswer answerHeight":"answerHeight"}
                dangerouslySetInnerHTML={createMarkup(answer)}
              >
              </ListGroupItem>
            ))}
          </ListGroup>
          <QuestionTracker className="questionTracker" difficulty={this.props.question.difficulty} category={this.props.category}></QuestionTracker>
      </div>
    )
  }
}
