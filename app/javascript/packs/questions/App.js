import React from 'react'
import axios from 'axios'

import Question from './Question.js'
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
    return axios.get('/questions.json').then(this.updateAppState.bind(this)).catch((err) => {
      console.error("couldn't get questions", err)
      throw "couldn't get questions"
    })
  }
  updateAppState({ data: { questions, isAdmin } }) {
    console.log(questions, isAdmin)
    this.setState({ questions, isAdmin })
  }

  async handleAsk(question) {
    this.updateAppState(await axios.post(`/questions.json`, question))
  }

  async handleVote(questionId, up) {
    this.updateAppState(await axios.post(`/questions/${questionId}/vote.json`, { up }))
  }

  async handleDismiss(questionId) {
    this.updateAppState(await axios.post(`/questions/${questionId}/dismiss.json`))
  }

  render() {
    const { questions, isAdmin } = this.state || {};
    return (
      <UserContext.Provider value={isAdmin}>
        <div className="row">
          <h2 className="col">Questions</h2>
          <div className="col align-middle text-right mr-4 mt-2">
            <span className="oi oi-bolt text-success live" /> live
          </div>
        </div>

        {!isAdmin && <p><span className="oi oi-arrow-thick-top"></span> Up or <span className="oi oi-arrow-thick-bottom"></span> down vote submitted questions. Or submit your own.</p>}

        {questions ?
          questions.map(q => <Question key={q.id} {...{ question: q, onVote: this.handleVote.bind(this), onDismiss: this.handleDismiss.bind(this) }} />)
          : <h4>Loading...</h4>
        }

        <SubmitQuestion onAsk={this.handleAsk.bind(this)} />
      </UserContext.Provider>
    )
  }
}
