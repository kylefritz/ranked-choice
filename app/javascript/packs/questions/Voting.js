import React from 'react'
import axios from 'axios'

export default class Voting extends React.Component {
  constructor(props) {
    super(props)
    this.state = { canVote: true }
  }

  handleVote(vote) {
    const { id: questionId } = this.props.question
    this.setState({ canVote: false }) // TODO: fix
    axios.post(`/questions/${questionId}.json`, { vote }).then(({ data }) => {
      console.log(data)
    }).catch((err) => {
      throw "couldn't vote"
    })
  }

  handleUpVote() {
    this.handleVote(+1)
  }

  handleDownVote() {
    this.handleVote(-1)
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
        <button type="button" class="btn btn-outline-primary" onClick={this.handleUpVote.bind(this)}>
          <span className="oi oi-arrow-thick-top"></span> {upVoteCount}
        </button>
        <br />
        <button type="button" class="btn btn-outline-primary mt-2" onClick={this.handleDownVote.bind(this)}>
          <span className="oi oi-arrow-thick-bottom"></span> {downVoteCount}
        </button>
      </div>
    )
  }
}
