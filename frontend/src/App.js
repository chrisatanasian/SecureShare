import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
  }

  submitPost = () => {
    fetch('http://localhost:4000/posts/', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify({ content: this.state.content }),
    })
      .then(response => response.json())
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent = (event) => {
    this.setState({ content: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            SecureShare
          </h1>
          <label className="label">
            Enter your content to be securely shared:
          </label>
          <textarea className="input" type="text" name="content" value={this.state.content} onChange={this.updateContent} />
          <button type="button" className="submit" onClick={this.submitPost}>
            Submit
          </button>
        </header>
      </div>
    );
  }
}

export default App;
