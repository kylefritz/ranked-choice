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

  render() {
    const { voteCount, upVoteCount, downVoteCount } = this.props.question
    const { canVote } = this.state;
    if (!canVote) {
      return (
        <div className="col" alt="You already voted for this one">
          <div>
            <span className="oi oi-arrow-thick-top"></span> {upVoteCount}
          </div>
          <div>
            <span className="oi oi-arrow-thick-bottom"></span> {downVoteCount}
          </div>
        </div>)
    }

    return (
      <div className="col" alt={`voteCount=${voteCount}`}>
        <button type="button" className="btn btn-outline-primary" onClick={this.handleUpVote.bind(this)}>
          <span className="oi oi-arrow-thick-top"></span> {upVoteCount}
        </button>
        <br />
        <button type="button" className="btn btn-outline-primary mt-2" onClick={this.handleDownVote.bind(this)} >
          <span className="oi oi-arrow-thick-bottom"></span> {downVoteCount}
        </button >
      </div >
    )
  }
}
