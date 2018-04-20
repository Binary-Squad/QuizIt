import React, {Component} from "react";
import "./MobileSwipeGuide.css";

class MobileSwipeGuide extends Component {

  render(){
    return(
      <div className="mobile-swipeGuide">
        {this.props.left.show?<span className="mobile-swipeGuide-left">{this.props.left.text}</span>:null}
        {this.props.right.show?<span className="mobile-swipeGuide-right">{this.props.right.text}</span>:null}
      </div>
    )
  }
}

export default MobileSwipeGuide;