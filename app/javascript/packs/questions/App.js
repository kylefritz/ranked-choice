import React from 'react'
import axios from 'axios'

import List from './List.js'
import SubmitQuestion from './SubmitQuestion.js'
import UserContext from './UserContext'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isAdmin: false }
  }

  componentDidMount() {
    this.loadQuestions()
    this.timer = setInterval(() => this.loadQuestions(), 30 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  loadQuestions() {
    return axios.get('/questions.json').then(({ data: questions }) => {
      console.log(questions)
      this.setState({ questions })
    }).catch((err) => {
      throw "couldn't get questions"
    })
  }

  async handleAsk(question) {
    const { data: questions } = await axios.post(`/questions.json`, question)
    console.log(questions)
    this.setState({ questions })
  }

  async handleVote(questionId, up) {
    const { data: questions } = await axios.post(`/questions/${questionId}/vote.json`, { up })
    console.log(questions)
    this.setState({ questions })
  }

  async handleDismiss(questionId) {
    const { data: questions } = await axios.post(`/questions/${questionId}/dismiss.json`)
    console.log(questions)
    this.setState({ questions })
  }

  handleToggleContext() {
    this.setState({ isAdmin: !this.state.isAdmin })
  }

  render() {
    const { questions, isAdmin } = this.state || {};
    return (
      <UserContext.Provider value={isAdmin}>
        <div>
          <button type="button" className="btn btn-outline-primary" onClick={this.handleToggleContext.bind(this)}>
            toggle context
            </button>
          <div className="row">
            <h2 className="col">Questions</h2>
            <div className="col align-middle text-right mr-4 mt-2"><span className="oi oi-bolt text-success"></span> live</div>
          </div>
          {!isAdmin && <p><span className="oi oi-arrow-thick-top"></span> Up or <span className="oi oi-arrow-thick-bottom"></span> down vote submitted questions. Or submit your own.</p>}

          <List
            questions={questions}
            onVote={this.handleVote.bind(this)}
            onDismiss={this.handleDismiss.bind(this)} />
          <SubmitQuestion onAsk={this.handleAsk.bind(this)} />
        </div>
      </UserContext.Provider>
    )
  }
}
