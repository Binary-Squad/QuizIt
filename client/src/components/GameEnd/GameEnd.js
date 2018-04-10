import React, { Component } from "react";
// import socket from '../io';

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
      <div>
        <h1>GameEnd Leaderboard</h1>
      	{this.state.scores?this.state.scores.map(score=>{
          return(
            <div key={score.uid}>{score.uid} {score.name} {score.score}</div>
          )
        }):<div>loading</div>}
      </div>
    );
  }
}

export default GameEnd;