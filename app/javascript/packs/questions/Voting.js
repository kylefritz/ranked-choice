import React from 'react'

export default class Voting extends React.Component {
  constructor(props) {
    super(props)
    this.state = { canVote: true }
  }

  handleVote(up) {
    const { id: questionId } = this.props.question
    this.setState({ canVote: false }) // TODO: better canVote lock-out
    this.props.onVote(questionId, up).catch((err) => {
      console.error("couldn't vote on", questionId, 'up=', up)
      alert("couldn't vote")
    })
  }

  handleUpVote() {
    this.handleVote(true)
  }

  handleDownVote() {
    this.handleVote(false)
  }

  handleDismiss() {
    const { id: questionId } = this.props.question
    this.props.onDismiss(questionId).catch((err) => {
      console.error("couldn't dismiss", questionId)
      alert("couldn't dismiss")
    })
  }

  render() {
    const { isAdmin } = this.props
    const { voteCount, upVoteCount, downVoteCount } = this.props.question

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

    const { canVote } = this.state;
    if (!canVote) {
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
