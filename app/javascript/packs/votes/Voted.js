import React from 'react'
import _ from 'lodash'

export default function Voted({ vote }) {
  const ranked = vote.ranked.split(',')
  return (
    <div>
      <h4>You have voted</h4>
      <hr />
      <h4>You ranked the candidates</h4>
      {ranked.map((lastName, i) => {
        let firstName = ""
        return (
          <div className="row mt-3" key={lastName}>
            <div className="col-2">
              <h5 className="text-center">{i + 1}</h5>
            </div>
            <div className="col-10">
              <h5>{firstName} {lastName}</h5>
            </div>
          </div>
        );
      })}

      <div className="row mt-4">
        <div className="col">
          <a className="btn btn-primary btn-lg btn-block" href="/results" role="button">Results</a>
        </div>
      </div>
    </div >
  )
}

