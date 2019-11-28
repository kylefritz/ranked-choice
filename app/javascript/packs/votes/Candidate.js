import React from 'react'
import ordinal from 'ordinal'


export default function candidate({ firstName, lastName, rank, onRank }) {
  const canRank = !rank
  const handleClick = () => {
    if (canRank) {
      onRank(lastName)
    }
  }

  return (
    <div className="row mt-3">
      <div className="col-2">
        <h2 className="text-center">{rank && ordinal(rank)}</h2>
      </div>
      <div className="col-10">
        <button type="button"
          className="btn btn-primary btn-lg btn-block"
          disabled={!canRank}
          onClick={handleClick}>
          {firstName} {lastName}
        </button>
      </div>
    </div>
  )
}
