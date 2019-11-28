import React from 'react'
import axios from 'axios'
import _ from 'lodash'

import Candidate from './Candidate'
import Voted from './Voted'

const createBallot = (candidates) => Object.fromEntries(candidates.map(({ firstName, lastName }) => {
  const candidateEntry = { firstName, lastName, rank: null }
  return [lastName, candidateEntry]
}))

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }

  componentDidMount() {
    Promise.allSettled([
      // load candidates
      axios.get('/candidates.json').then(({ data: candidates }) => {

        this.setState({ candidates })
        this.resetBallot()
      }).catch((err) => {
        console.warn("couldnt get candidates")
        throw err
      }),

      // see if this person has already voted, if so they'll redirect to a confirmation page
      axios.get('/votes.json').then(({ data: vote }) => {
        this.setState({ vote })
      })
    ]).then(() => this.setState({ loading: false }))
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
    const { submitting } = this.state;
    if (submitting) {
      console.warn("ballot is already submitting. chill.")
      return false;
    }

    const num = this.rankedCandidates().length
    if (num == 0) {
      window.alert("Please rank candidates by tapping on their names.")
      return false
    }
    const text = () => {
      if (num == 1) {
        return "You can rank more than 1 candidate. Submit ballot anyway?"
      }
      return "Submit ballot?"
    }
    return window.confirm(text())
  }

  rankedCandidates() {
    let { ballot } = this.state
    const ranked = _.values(ballot).filter(({ rank }) => !!rank)
    return _.sortBy(ranked, ({ rank }) => rank).map(({ lastName }) => lastName)
  }

  handleSubmit() {
    if (!this.shouldSubmitBallot()) {
      return;
    }

    const vote = this.rankedCandidates()
    console.log("submitting vote", vote)
    this.setState({ submitting: true })

    axios.post('/votes.json', { vote }).then(({ data: vote }) => {
      console.info("ballot submitted", vote)
      this.setState({ vote })
    }).catch(err => {
      console.error("Error submitting ballot", err)
      alert("Error submitting ballot. Try again.")
    }).finally(() => {
      this.setState({ submitting: false })
    })
  }

  render() {
    const { ballot, vote, loading } = this.state || {};
    if (loading) {
      return <h5>Loading...</h5>
    }
    if (vote) {
      return <Voted vote={vote} />
    }
    if (!ballot) {
      return <h5>Can't load ballot :(</h5>
    }
    return (
      <>
        <h3>Rank the candidates</h3>
        <p>Tap on names in the order of your preference.</p>
        <p>It's ok not to rank all of the candidates.</p>

        {_.values(ballot).map((c) =>
          <Candidate key={c.lastName} {...c} onRank={this.handleRank.bind(this)} />)}

        <div className="row mt-4">
          <div className="col">
            <button type="button"
              className="btn btn-secondary btn-lg btn-block"
              onClick={this.handleReset.bind(this)}>
              Start Over
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
      </>
    )
  }
}
