import React from 'react'
import axios from 'axios'
import _ from 'lodash'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }

  componentDidMount() {
    this.loadResults()
  }

  loadResults() {
    axios.get('/results.json').then(({ data: rounds }) => {
      this.setState({ rounds })
    }).catch((err) => {
      throw "couldn't get results"
    }).finally(() => this.setState({ loading: false }))
  }

  render() {
    const { rounds, loading } = this.state || {};
    if (loading) {
      return <h5>Loading...</h5>
    }
    if (!rounds.length) {
      return <h5>No results yet :/</h5>
    }
    const totalVotes = _.sum(Object.values(_.get(rounds, 0, {})))
    return (
      <div>
        <div className="row">
          <h3 className="col">Results</h3>
          <div className="col align-middle text-right">
            <small>votes cast: {totalVotes}</small>
          </div>
        </div>

        <details>
          <summary>What is ranked-choice voting?</summary>
          <p>In <a href="https://www.fairvote.org/rcv" target="_blank">ranked-choice voting</a>, voters get to rank candidates in order of choice. If a candidate receives more than half of the first choices, they win, just like any other election. If not, the candidate with the fewest votes is eliminated, and voters who picked that candidate as ‘number 1’ will have their votes count for their next choice. This process continues for multiple rounds until a candidate wins with more than half of the votes.</p>
          <p>In traditional voting, the candidate with the most votes in the 1st round would win.</p>
        </details>

        {rounds.map((round, i) => {
          const winner = round
          return (
            <div key={i} className="row mt-3">
              <div className="col-4">
                Round #{i + 1}
              </div>
              <div className="col">
                <table>
                  <tbody>
                    {Object.entries(round).map(([candidate, votes]) => (
                      <tr key={candidate}>
                        <td><strong>{candidate}:</strong></td>
                        <td>{votes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}
      </div >
    )
  }
}
