// Run this example by adding <%= javascript_pack_tag 'questions' %> to an erb page

import ErrorBoundary from './questions/ErrorBoundary.js'
import App from './questions/App.js'

import React from 'react'
import ReactDOM from 'react-dom'

document.addEventListener('DOMContentLoaded', () => {
  console.log('from webpack')
  const jsx = (<ErrorBoundary><App /></ErrorBoundary>)
  ReactDOM.render(
    jsx,
    document.getElementById('mount-questions-react-app')
  )
})
