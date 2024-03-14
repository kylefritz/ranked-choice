import React from 'react'
import axios from 'axios'
import _ from 'lodash'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loaded: false }
  }

  componentDidMount() {
    this.loadResults()
    this.timer = setInterval(() => this.loadResults(), 10 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  loadResults() {
    axios.get('/results.json').then(({ data }) => {
      console.log(data)
      this.setState(data)
    }).catch((err) => {
      console.warn("couldnt get results")
      throw err
    }).finally(() => this.setState({ loaded: true }))
  }

  render() {
    const { rounds, loaded, resultsEnabled, isAdmin } = this.state || {};
    if (!loaded) {
      return <h5>Loading...</h5>
    }
    const totalVotes = rounds && _.sum(Object.values(_.get(rounds, 0, {})))

    if (!isAdmin && !resultsEnabled) {
      return (
        <>
          <h3 className="text-center mt-5 mb-3">
            Results not open yet
          </h3>
          <h3 className="text-center">
            <small>
              <span className="oi oi-bolt text-success live" /> live
            </small>
          </h3>
          {totalVotes && (
            <h3 className="text-center mt-4">
              <small>votes cast: {totalVotes} </small>
            </h3>
          )}
        </>
      )
    }

    if (!_.get(rounds, 'length')) {
      return <h5>No results yet :/</h5>
    }

    return (
      <>
        <div className="row">
          <h3 className="col">Results</h3>
          <div className="col text-right">
            <small>votes cast: {totalVotes} <br />
              <span className="oi oi-bolt text-success"></span> live
            </small>
          </div>
        </div>

        <details>
          <summary>What is ranked-choice voting?</summary>
          <p>In <a href="https://www.fairvote.org/rcv" target="_blank" rel="noopener noreferrer">ranked-choice voting</a>, voters get to rank candidates in order of choice. If a candidate receives more than half of the first choices, they win, just like any other election. If not, the candidate with the fewest votes is eliminated, and voters who picked that candidate as ‘number 1’ will have their votes count for their next choice. This process continues for multiple rounds until a candidate wins with more than half of the votes.</p>
          <p>In traditional voting, the candidate with the most votes in the 1st round would win.</p>
        </details>

        {!resultsEnabled && isAdmin && <p className="text-danger">Results are hidden; you're seeing because you're admin</p>}

        {rounds.map((round, i) => {
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
        <hr />
        <p>The real Baltimore City Primary is April 28, 2020.</p>
        <p>Early voting is April 16 to April 23.</p>
      </>
    )
  }
}
