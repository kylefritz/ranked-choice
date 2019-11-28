import React from 'react'
import * as Sentry from '@sentry/browser'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, eventId: null };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
    this.setState({ error: error.message, stack: error.stack.toString() })
  }

  render() {
    if (this.state.hasError) {
      const { eventId, error, stack } = this.state;
      // render fallback UI
      return (
        <>
          <h2>There was an error in this voting software :(</h2>
          <div className="mt-3">
            <button onClick={() => Sentry.showReportDialog({ eventId })}
              className="btn-primary btn-lg btn-block" type="button">
              Tell us what happened!
            </button>
          </div>
          <p className="text-center">Then maybe try again or try back later?</p>
          <div className="mt-5">
            <code>{error}</code>
          </div>
          <div className="mt-2">
            <code className="stack-trace">
              {stack}
            </code>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}
