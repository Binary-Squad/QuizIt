import React, { Component } from "react";

class Logout extends Component {

  componentWillMount() {
    localStorage.clear()
  }

  render() {
    return (
      <div>
        <p>Logout</p>
        <div>
          You've been logged out.
        </div>
      </div>
    );
  }
}

export default Logout;
