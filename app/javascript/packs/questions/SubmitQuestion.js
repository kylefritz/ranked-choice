import React from 'react'

export default class SubmitQuestion extends React.Component {
  constructor(props) {
    super(props)
    this.refText = React.createRef();
    this.refName = React.createRef();
    this.refBlock = React.createRef();
    this.state = { justAsked: false };
  }

  handleSubmit(event) {
    event.preventDefault();

    const text = this.refText.current.value;
    const author = this.refName.current.value;
    const block = this.refBlock.current.value;

    if (!text) {
      alert("You forgot to include the question")
      return
    }

    if (!author) {
      alert("Include your name")
      return
    }

    if (!block) {
      alert("Include your block/location")
      return
    }

    this.props.onAsk({ text, author, block }).then(() => {
      // clear form
      this.refText.current.value = ""
      this.refName.current.value = ""
      this.refBlock.current.value = ""

      // hide form for a little so people know we took care of it
      this.setState({ justAsked: true })
      setTimeout(() => this.showForm(), 10 * 1000);
    }).catch(err => {
      console.error("Error submitting question", err)
      this.showForm()
      alert("Error submitting question. Try again.")
    })
  }

  showForm() {
    this.setState({ justAsked: false })
  }

  render() {
    const { justAsked } = this.state;
    if (justAsked) {
      return (
        <div>
          <h4>Question submitted!</h4>
          <br />
          <p><button onClick={() => this.showForm()} className="btn btn-primary">Ask another</button></p>
          <br />
          <br />
        </div>
      )
    }
    return (
      <form className="mt-5" onSubmit={this.handleSubmit.bind(this)}>
        <h3>Ask a new question</h3>
        <div className="form-group">
          <label htmlFor="sq-text">Question</label>
          <input type="text" className="form-control" id="sq-text" placeholder="What would you like to ask the candidates?" ref={this.refText} />
        </div>
        <div className="form-group">
          <label htmlFor="sq-submitted-by">Your Name</label>
          <input type="text" className="form-control" id="sq-submitted-by" placeholder="What's your name?" ref={this.refName} />
        </div>
        <div className="form-group">
          <label htmlFor="sq-block">Your Block/Street</label>
          <input type="text" className="form-control" id="sq-block" ref={this.refBlock} />
        </div>
        <button type="submit" className="btn btn-primary">Submit Question</button>
      </form >
    )
  }
}
