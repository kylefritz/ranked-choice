import React from 'react'
import axios from 'axios'
import * as _ from 'lodash'

export default function Voted({ vote }) {
  const ranked = vote.ranked.split(',')
  return (
    <div>
      <h3>You have voted</h3>
      <p>The real Baltimore City Primary is April 28, 2020.</p>
      <p>Early voting is April 16 to April 23.</p>
      <hr />
      <h3>You ranked the candidates</h3>
      {ranked.map((lastName, i) => {
        let firstName = ""
        return (
          <div className="row mt-3" key={lastName}>
            <div className="col-2">
              <h5 className="align-middle text-center">{i + 1}</h5>
            </div>
            <div className="col-10">
              <h5 className="align-middle">{firstName} {lastName}</h5>
            </div>
          </div>
        );
      })}
    </div >
  )
}

