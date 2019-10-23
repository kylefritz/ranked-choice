// Run this example by adding <%= javascript_pack_tag 'votes' %> to an erb page

import ErrorBoundary from './votes/ErrorBoundary.js'
import App from './votes/App.js'

import React from 'react'
import ReactDOM from 'react-dom'

document.addEventListener('DOMContentLoaded', () => {
  const jsx = (<ErrorBoundary><App /></ErrorBoundary>)
  ReactDOM.render(
    jsx,
    document.getElementById('mount-votes-react-app')
  )
})
