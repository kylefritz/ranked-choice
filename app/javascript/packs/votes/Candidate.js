import React from 'react'
import axios from 'axios'


export default function candidate({ firstName, lastName }) {
  return (
    <div className="row mt-3">
      <div className="col-2"></div>
      <div className="col-10">
        <button type="button" class="btn btn-primary btn-lg btn-block">
          {firstName} {lastName}
        </button>
      </div>
    </div>
  )
}
