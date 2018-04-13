import React, { Component } from "react";
// import socket from '../io';
import "./leaderboard.css";


class GameEnd extends Component {

  componentWillMount(){
    if(this.props.scores){
      var tempScores = this.props.scores.sort(function(a, b) {
        return parseFloat(b.score) - parseFloat(a.score);
      });
      this.setState({scores:tempScores});
    }
  }

  state = {
    scores:[]
  };

  render() {
    return (
      <div className="container-fluid">
      <div className="row">
      <div className="col-md-12 center">
        <h1 className="leaderboard-title">
        <img id="dancing-eddy" alt="meaningful text ;-)" src={require("./tenor.gif")}/>
        Leaderboard
        <img id="dancing-eddy" alt="meaningful text ;-)" src={require("./tenor.gif")}/>
        </h1>
      	<div className="leaderboard-score card-header">{this.state.scores?this.state.scores.map(score=>{return(
          <div key={score.uid}>{score.name}
            <h2>Score</h2>
            <div>{score.score}</div>
          </div>)
        }):<div>loading</div>}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameEnd;