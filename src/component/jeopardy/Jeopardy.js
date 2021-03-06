import React, { Component } from "react";
//import our service
import JeopardyService from "../../jeopardyService";
import Display from "../display/Display";

class Jeopardy extends Component {
  //set our initial state and set up our service as this.client on this component
  constructor(props) {
    super(props);

    this.client = new JeopardyService();
    this.state = {
      data: {},
      score: 0,
      value: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    // alert("A answer was submitted: " + this.state.value);
    event.preventDefault();

    this.setState((currentState) => {
      let score = currentState.score;
      if (currentState.value === currentState.data.answer) {
        //answered correctly
        score += currentState.data.value;
      } else {
        //answered incorrectly
        score -= currentState.data.value;
      }
      return { score, value: "" };
    });
    this.getNewQuestion();
  }

  //get a new random question from the API and add it to the data object in state;
  getNewQuestion() {
    return this.client.getQuestion().then((result) => {
      this.setState({
        data: result.data[0],
      });
    });
  }

  //when the component mounts, get a the first question
  componentDidMount() {
    // let data = this.context;
    // const { data } = this.props;
    this.getNewQuestion();
  }

  //display the results on the screen
  render() {
    let display = "loading";

    if (this.state.score.display) {
      display = this.state.score.display;

      // let catagory = "loading";

      // if (this.state.data.catagory) {
      //   catagory = this.state.data.catagory.title;
      // }
    }

    return (
      <div className="Display">
        <Display score={this.state.score} />
        <form onSubmit={this.handleSubmit}>
          <label>
            Answer:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <strong>User's Score:</strong>
        {this.state.score} <br />
        <strong>Question:</strong>
        {this.state.data.question} <br />
        <strong>Value:</strong>
        {this.state.data.value} <br />
        {/* <strong>Catagory:</strong>
        {catagory} */}
        <br />
      </div>
    );
  }
}

export default Jeopardy;
//citation: geekforgeeks.org/creat-a-quiz-app, reactjs.org for referances.
