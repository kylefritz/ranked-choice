import React from 'react'
import axios from 'axios'

import Candidate from './Candidate'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    axios.get('/candidates.json').then(({ data: candidates }) => {
      console.log(candidates)
      this.setState({ candidates })
    }).catch((err) => {
      throw "couldn't get questions"
    })
  }

  render() {
    const { candidates } = this.state || {};
    if (!candidates) {
      return <h5>Loading</h5>
    }
    return (
      <div>
        <h3>Rank the candidates</h3>
        <p>Tap in order to rank them</p>

        {candidates.map(c => <Candidate {...c} />)}

        <div className="row mt-3">
          <div className="col">
            <button type="button" class="btn btn-outline-secondary btn-lg btn-block">
              Reset
            </button>
          </div>
          <div className="col">
            <button type="button" class="btn btn-primary btn-lg btn-block">
              Submit
          </button>
          </div>
        </div>
      </div>
    )
  }
}
