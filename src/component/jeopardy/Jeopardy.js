import React, { Component } from "react";
//import our service
import JeopardyService from "../../jeopardyService";

class Jeopardy extends Component {
  //set our initial state and set up our service as this.client on this component
  constructor(props) {
    super(props);

    this.client = new JeopardyService();
    this.state = {
      data: {},
      score: 0,
      value: "",
      answersCount: 0,
      result: "",
      resetData: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A answer was submitted: " + this.state.value);
    event.preventDefault();
  }
  // handleInputChange(event) {
  //   const target = event.target;
  //   const value = (target.type === "answer") | target.checked | target.value;
  //   const name = target.name;

  //   this.setState({
  //     [name]: value,
  // });
  //  }

  answer = (user) => {
    const player = `${user}PlayerScore`;
    let score = this.state[player].score;

    if (Math.random() > 0.5) {
      score += 1;
    }

    this.setState((state, props) => ({
      [player]: {
        answer: state[player].score + 1,
        score: score,
      },
    }));
  };
  // playAgain = () => {
  //   this.getQuestions();
  //   this.setState({ score: 0, responses: 0 });
  // };
  // computeAnswer = (answer, correctAnswer) => {
  //   if (answer === correctAnswer) {
  //     this.setState({
  //       score: this.state.score + 1,
  //     });
  //   }
  //   this.setState({
  //     responses: this.state.responses < 5 ? this.state.responses + 1 : 5,
  //   });
  // };
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
    const { data } = this.props;
    this.getNewQuestion(data);
  }
  shouldComponentUpdate() {
    return this.newMethod();
  }
  newMethod() {
    return true;
  }

  userAnswer(answer) {
    this.setState((state) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: (state.answersCount[answer] || 0) + 1,
      },
      answer: answer,
    }));
  }

  //display the results on the screen
  render() {
    let catagory = "loading";

    if (this.state.data.catagory) {
      catagory = this.state.data.catagory.title;
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Answer:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div className="user-input__answer">
          <button
            className="button"
            onClick={this.setState.userAnswer}
          ></button>
        </div>
        <strong>User's Score:</strong>
        {this.state.score} <br />
        <strong>Question:</strong>
        {this.state.data.question} <br />
        <strong>Value:</strong>
        {this.state.data.value} <br />
        <strong>Catagory:</strong>
        {catagory}
        <br />
      </div>
    );
  }
}

export default Jeopardy;
//citation: geekforgeeks.org/creat-a-quiz-app, reactjs.org for referances.
