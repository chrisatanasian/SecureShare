import React, { Component } from 'react';
import './Main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '', slug: '' };
  }

  serverUrl() {
    const node_env = process.env.NODE_ENV;
    if (!node_env || node_env === 'development') {
      return 'http://localhost:4000';
    } else {
      throw new Error(`Server url not defined for environment ${node_env}`);
    }
  }

  clientUrl() {
    return window.location.origin;
  }

  submitPost = () => {
    fetch(`${this.serverUrl()}/posts`, {
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

    return `${this.clientUrl()}/${slug}`;
  }

  urlText() {
    const { slug } = this.state;
    const url = this.url();

    return slug ? (
      <h3>
        Your secure URL:
        <br />
        <a href={url}>{url}</a>
      </h3>
    ) : null;
  }

  render() {
    const { content } = this.state;

    return (
      <div className="Main">
        <header className="Main-header">
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

export default Main;
