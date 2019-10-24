import React from 'react'

import Voting from './Voting.js'
import UserContext from './UserContext'

export default class Question extends React.Component {
  render() {
    const { question, onVote, onDismiss, isEnabled } = this.props
    const { text, submittedBy, isHidden, block } = question
    return (
      <section className={`row ${isHidden && 'd-none'}`} style={{ minHeight: '106px' }}>
        <div className="col">
          <p className="question">{text}</p>
          <div className="small" style={{ marginTop: '-16px', paddingBottom: '20px' }}>
            <strong>{submittedBy}</strong> from {block}
          </div>
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
