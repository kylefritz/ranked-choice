import React from 'react'

import Voting from './Voting.js'

export default class Question extends React.Component {
  render() {
    const { question, onVote } = this.props
    const { text, submittedBy } = question
    return (
      <section className="row mt-5">
        <div className="col-10">
          <p className="lead">{text}</p>
          <div className="small" style={{ marginTop: '-16px', paddingBottom: '20px' }}>{submittedBy}</div>
        </div>
        <Voting question={question} onVote={onVote} />
      </section>
    )
  }
}
