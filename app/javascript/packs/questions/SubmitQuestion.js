import React from 'react'
import axios from 'axios'

export default class SubmitQuestion extends React.Component {
  constructor(props) {
    super(props)
    this.refText = React.createRef();
    this.refName = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();

    const text = this.refText.current.value;
    const submittedBy = this.refName.current.value;

    axios.post(`/questions.json`, { text, submittedBy }).then(({ data }) => {
      console.log(data)
    }).catch((err) => {
      throw "couldn't submit question"
    })
  }

  render() {
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
        <button type="submit" class="btn btn-primary">Submit Question</button>
      </form>
    )
  }
}
