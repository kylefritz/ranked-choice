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

  handleSubmit() {
    const submit = window.confirm("Submit ballot?")
    if (submit) {
      let { ballot } = this.state
      const rankedCandidates = Object.values(ballot).filter(({ rank }) => !!rank)
      const rankedVote = _.sortBy(rankedCandidates, ({ rank }) => rank).map(({ lastName }) => lastName)
      console.log("rankedVote", rankedVote)
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
