import React from "react";

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1> Display {this.props.score}</h1>
      </div>
    );
  }
}
export default Display;
