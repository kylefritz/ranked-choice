import React from 'react'

import Voting from './Voting.js'
import UserContext from './UserContext'

export default class Question extends React.Component {
  render() {
    const { question, onVote, onDismiss, isEnabled } = this.props
    const { text, submittedBy, isHidden } = question
    return (
      <section className={`row mt-5 ${isHidden && 'd-none'}`}>
        <div className="col">
          <p className="lead">{text}</p>
          <div className="small" style={{ marginTop: '-16px', paddingBottom: '20px' }}>{submittedBy}</div>
        </div>
        <div className="col-auto">
          <UserContext.Consumer className="col-auto">
            {isAdmin => (<Voting {...{ question, onVote, isAdmin, onDismiss, isEnabled }} />)}
          </UserContext.Consumer>
        </div>
      </section>
    )
  }
}
