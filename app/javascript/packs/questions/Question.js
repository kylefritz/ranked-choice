import React from 'react'

export default class Question extends React.Component {
  render() {
    const { text, submittedBy, voteCount, upVoteCount, downVoteCount } = this.props.question
    return (
      <section className="row">
        <div className="col-10">
          <p className="lead">{text}</p>
          <div className="small" style={{ marginTop: '-16px', paddingBottom: '20px' }}>{submittedBy}</div>
        </div>
        <div className="col" alt={`voteCount=${voteCount}`}>
          <div><span className="oi oi-arrow-thick-top"></span> {upVoteCount}</div>
          <div><span className="oi oi-arrow-thick-bottom"></span> {downVoteCount}</div>
        </div>
      </section>
    )
  }
}
