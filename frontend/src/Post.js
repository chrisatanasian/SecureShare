import React, { Component } from 'react';
import CryptoJS from 'crypto-js';
import './Main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { 'content': '' };
  }

  componentDidMount() {
    this.loadPost();
  }

  loadPost = () => {
    const { pathname } = this.props.location;

    fetch(`${process.env.REACT_APP_API_URL}/posts${pathname}`, {
      method: 'GET',
      headers: new Headers({
        'content-type': 'application/json',
      }),
    })
      .then(response => response.json())
      .then((responseData) => {
        if (responseData) {
          this.setState({ 'content': CryptoJS.AES.decrypt(responseData.content, process.env.REACT_APP_SECRET_KEY).toString(CryptoJS.enc.Utf8) });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  message() {
    const { content } = this.state;

    return content ? (
      <React.Fragment>
        <h2>Your secure message, which will not be retrievable again:</h2>
        <textarea className="input"
                  type="text"
                  name="content"
                  readOnly={true}
                  value={content}
                  onChange={this.updateContent}
                  ref={(input) => { this.input = input; }}/>
      </React.Fragment>
    ) : null;
  }

  render() {
    return (
      <div className="Main">
        {this.message()}
      </div>
    );
  }
}

export default Main;
