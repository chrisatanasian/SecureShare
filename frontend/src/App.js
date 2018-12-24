import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '', slug: '' };
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
        this.setState({ slug: responseData.slug });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent = (event) => {
    this.setState({ content: event.target.value });
  }

  url() {
    const { slug } = this.state;

    return `http://localhost:3000/${slug}`;
  }

  urlText() {
    const { slug } = this.state;
    const url = this.url();

    return slug ? (
      <h1>
        Your secure URL:
        <br />
        <a href={url}>{url}</a>
      </h1>
    ) : null;
  }

  render() {
    const { content } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>
            SecureShare
          </h1>

          <label className="label">
            Enter your content to be securely shared:
          </label>
          <textarea className="input" type="text" name="content" value={content} onChange={this.updateContent} />
          <button type="button" className="submit" onClick={this.submitPost}>
            Submit
          </button>

          {this.urlText()}
        </header>
      </div>
    );
  }
}

export default App;
