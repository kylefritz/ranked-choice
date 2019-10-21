import React from 'react'
import axios from 'axios'

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
    return (
      <div>
        <h2>Questions!</h2>
      </div>
    )
  }
}
