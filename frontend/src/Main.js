import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CryptoJS from 'crypto-js';
import './Main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '', slug: '', copied: false };
  }

  componentDidMount() {
    this.input.focus();
  }

  clientUrl() {
    return window.location.origin;
  }

  submitPost = () => {
    fetch(`${process.env.REACT_APP_API_URL}/posts`, {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify({ content: CryptoJS.AES.encrypt(this.state.content, process.env.REACT_APP_SECRET_KEY).toString() }),
    })
      .then(response => response.json())
      .then((responseData) => {
        this.setState({ slug: responseData.slug, copied: false });
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
    const { slug, copied } = this.state;
    const url = this.url();

    return slug ? (
      <React.Fragment>
        <h3>
          Your secure URL:
          <br />
          <a href={url}>{url}</a>
        </h3>
        <CopyToClipboard text={url} onCopy={() => this.setState({ copied: true })}>
          <button>Copy to Clipboard</button>

        </CopyToClipboard>
        {copied ? <span className="copied">Copied.</span> : null}
      </React.Fragment>
    ) : null;
  }

  render() {
    const { content } = this.state;

    return (
      <div className="Main">
        <h1>
          SecureShare
        </h1>

        <label className="label">
          Enter your message for a secure, one-time share:
        </label>
        <textarea className="input"
                  type="text"
                  name="content"
                  value={content}
                  onChange={this.updateContent}
                  ref={(input) => { this.input = input; }}/>
        <button type="button" className="submit" onClick={this.submitPost} disabled={content === ""}>
          Submit
        </button>

        {this.urlText()}
      </div>
    );
  }
}

export default Main;
