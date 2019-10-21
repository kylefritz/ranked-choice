import React from 'react'
import axios from 'axios'

import List from './List.js'

export default class App extends React.Component {

  componentDidMount() {
    axios.get('/questions.json').then(({ data: questions }) => {
      console.log(questions)
      this.setState({ questions })
    }).catch((err) => {
      throw "couldn't get questions"
    })
  }

  render() {
    const { questions } = this.state || {};
    return (
      <div>
        <h2 className="mt-5">Questions!</h2>
        <List questions={questions} />
      </div>
    )
  }
}
