import React from 'react'
import axios from 'axios'

import List from './List.js'
import SubmitQuestion from './SubmitQuestion.js'

export default class App extends React.Component {

  componentDidMount() {
    axios.get('/questions.json').then(({ data: questions }) => {
      console.log(questions)
      this.setState({ questions })
    }).catch((err) => {
      throw "couldn't get questions"
    })
  }

  handleAskQuestion(question) {
    return axios.post(`/questions.json`, question).then(({ data: questions }) => {
      console.log(questions)
      this.setState({ questions })
    })
  }

  render() {
    const { questions } = this.state || {};
    return (
      <div>
        <h2>Questions</h2>
        <List questions={questions} />
        <SubmitQuestion onAskQuestion={this.handleAskQuestion.bind(this)} />
      </div>
    )
  }
}
