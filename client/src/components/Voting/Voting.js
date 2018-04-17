import React, { Component } from "react";
import socket from '../io';

class Voting extends Component {

  state = {

  };

  handleVote = (categoryNum,userId)=>{
    const socketObj = {
      userId,
      categoryNum,
      room:'master'
    }
    console.log(socketObj);
    socket.emit('vote',socketObj);
  }

  componentDidMount(){
    console.log(this.props.votingCategories);
  }

  render() {
    return (
      <div>
        {this.props.votingCategories.map((votingInfo,index)=>{return(
          <div key={index}>
            <button
              onClick={()=>{this.handleVote(votingInfo.categoryNum,this.props.userId)}}
              className="btn btn-primary btn-vote"
            >
              {votingInfo.category}
            </button>
          </div>
        )
        })}
      </div>
    );
  }
}

export default Voting;