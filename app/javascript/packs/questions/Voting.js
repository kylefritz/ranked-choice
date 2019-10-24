import React from 'react'

let havePressedHidOnce = false

export default class Voting extends React.Component {
  handleVote(up) {
    const { id: questionId, canVote } = this.props.question
    if (!canVote) {
      console.warn("you can't vote on question", this.props.question)
      return
    }
    this.props.onVote(questionId, up).catch((err) => {
      console.error("couldn't vote on", questionId, 'up=', up)
      window.alert("couldn't vote")
    })
  }

  handleUpVote() {
    this.handleVote(true)
  }

  handleDownVote() {
    this.handleVote(false)
  }

  handleDismiss() {
    if (!havePressedHidOnce && !window.confirm("Hide question?")) {
      return
    }
    havePressedHidOnce = true

    const { id: questionId } = this.props.question
    this.props.onDismiss(questionId).catch((err) => {
      console.error("couldn't dismiss", questionId)
      alert("couldn't dismiss")
    })
  }

  render() {
    const { isAdmin, question, isEnabled } = this.props
    const { voteCount, upVoteCount, downVoteCount, canVote } = question

    if (isAdmin) {
      return (
        <>
          <button type="button" className="btn btn-outline-danger" onClick={this.handleDismiss.bind(this)}>
            <span className="oi oi-circle-x"></span> Dismiss
          </button>
          <p className="mt-1 ml-3">
            <small>
              <span className="oi oi-arrow-thick-top" /> {upVoteCount}{" "}
              <span className="oi oi-arrow-thick-bottom" /> {downVoteCount}
            </small>
          </p>
        </>
      )
    }

    if (!canVote || !isEnabled) {
      return (
        <>
          <div>
            <span className="oi oi-arrow-thick-top" /> {upVoteCount}
          </div>
          <div>
            <span className="oi oi-arrow-thick-bottom" /> {downVoteCount}
          </div>
        </>)
    }

    return (
      <>
        <div>
          <button onClick={this.handleUpVote.bind(this)}
            className="btn btn-outline-primary" type="button">
            <span className="oi oi-arrow-thick-top" /> {upVoteCount}
          </button>
        </div>
        <div className="mt-2">
          <button onClick={this.handleDownVote.bind(this)}
            className="btn btn-outline-primary" type="button">
            <span className="oi oi-arrow-thick-bottom" /> {downVoteCount}
          </button >
        </div>
      </>
    )
  }
}
