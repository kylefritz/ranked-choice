// Run this example by adding <%= javascript_pack_tag 'results' %> to an erb page

import ErrorBoundary from './ErrorBoundary.js'
import App from './results/App.js'

import React from 'react'
import ReactDOM from 'react-dom'

document.addEventListener('DOMContentLoaded', () => {
  const jsx = (<ErrorBoundary><App /></ErrorBoundary>)
  ReactDOM.render(
    jsx,
    document.getElementById('mount-results-react-app')
  )
})
