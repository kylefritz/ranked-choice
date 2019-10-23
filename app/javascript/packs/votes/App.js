import React from 'react'
import axios from 'axios'
import * as _ from 'lodash'

import Candidate from './Candidate'

const createBallot = (candidates) => Object.fromEntries(candidates.map(({ firstName, lastName }) => {
  const candidateEntry = { firstName, lastName, rank: null }
  return [lastName, candidateEntry]
}))

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    axios.get('/candidates.json').then(({ data: candidates }) => {

      const ballot = createBallot(candidates)
      this.setState({ candidates })
      this.resetBallot()
    }).catch((err) => {
      throw "couldn't get questions"
    })
  }
  resetBallot() {
    this.setState({ ballot: createBallot(this.state.candidates), nextRank: 1 })
  }

  handleRank(lastName) {
    let { ballot, nextRank } = this.state
    ballot[lastName].rank = nextRank;

    console.log('ranked', ballot)
    this.setState({ ballot, nextRank: nextRank + 1 })
  }

  handleReset() {
    const reset = window.confirm("Reset ballot?")
    if (reset) {
      this.resetBallot()
    }
  }

  shouldSubmitBallot() {
    const num = this.rankedCandidates().length
    if (num == 0) {
      window.alert("Please rank candidates by tapping on their names.")
      return false
    }
    const text = () => {
      const numCandidates = this.state.candidates.length;
      if (num == 1) {
        return "You can ranked more than 1 candidate. Submit ballot anyway?"
      }
      if (num < numCandidates) {
        return "You have not ranked all the candidates. Submit ballot anyway?"
      }
      return "Submit ballot?"
    }
    return window.confirm(text())
  }

  rankedCandidates() {
    let { ballot } = this.state
    const ranked = Object.values(ballot).filter(({ rank }) => !!rank)
    return _.sortBy(ranked, ({ rank }) => rank).map(({ lastName }) => lastName)
  }

  handleSubmit() {
    if (this.shouldSubmitBallot()) {
      const ranked = this.rankedCandidates()
      console.log("rankedVote", ranked)
    }
  }

  render() {
    const { ballot } = this.state || {};
    if (!ballot) {
      return <h5>Loading</h5>
    }
    return (
      <div>
        <h3>Rank the candidates</h3>
        <p>Tap in order to rank them</p>

        {Object.values(ballot).map((c) =>
          <Candidate key={c.lastName} {...c} onRank={this.handleRank.bind(this)} />)}

        <div className="row mt-4">
          <div className="col">
            <button type="button"
              className="btn btn-secondary btn-lg btn-block"
              onClick={this.handleReset.bind(this)}>
              Reset
            </button>
          </div>
          <div className="col">
            <button type="button"
              className="btn btn-success btn-lg btn-block"
              onClick={this.handleSubmit.bind(this)}>
              Submit
          </button>
          </div>
        </div >
      </div >
    )
  }
}
