import React from 'react'

import Question from './Question.js'

export default class List extends React.Component {
  render() {
    const { questions } = this.props
    if (!questions) {
      return <h4>Loading...</h4>
    }

    return (
      <div>
        {questions.map(q => <Question key={q.id} question={q} />)}
      </div>
    )
  }
}
