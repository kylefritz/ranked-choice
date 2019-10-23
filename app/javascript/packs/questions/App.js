import React from 'react'
import axios from 'axios'

import List from './List.js'
import SubmitQuestion from './SubmitQuestion.js'

export default class App extends React.Component {

  componentDidMount() {
    this.loadQuestions()
    this.timer = setInterval(() => this.loadQuestions(), 30 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  loadQuestions() {
    axios.get('/questions.json').then(({ data: questions }) => {
      console.log(questions)
      this.setState({ questions })
    }).catch((err) => {
      throw "couldn't get questions"
    })
  }

  handleAsk(question) {
    return axios.post(`/questions.json`, question).then(({ data: questions }) => {
      console.log(questions)
      this.setState({ questions })
    })
  }

  handleVote(questionId, up) {
    return axios.post(`/questions/${questionId}/vote.json`, { up }).then(({ data: questions }) => {
      console.log(questions)
      this.setState({ questions })
    })
  }

  render() {
    const { questions } = this.state || {};
    return (
      <div>
        <div className="row">
          <h2 className="col">Questions</h2>
          <div className="col align-middle text-right mr-4 mt-2"><span className="oi oi-bolt text-success"></span> live</div>
        </div>

        <List questions={questions} onVote={this.handleVote.bind(this)} />
        <SubmitQuestion onAsk={this.handleAsk.bind(this)} />
      </div>
    )
  }
}
