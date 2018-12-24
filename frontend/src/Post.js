import React, { Component } from 'react';
import './Post.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { 'content': '' };
  }

  componentDidMount() {
    this.loadPost();
  }

  serverUrl() {
    const node_env = process.env.NODE_ENV;
    if (!node_env || node_env === 'development') {
      return 'http://localhost:4000';
    } else {
      throw new Error(`Server url not defined for environment ${node_env}`);
    }
  }

  loadPost = () => {
    const { pathname } = this.props.location;

    fetch(`${this.serverUrl()}/posts${pathname}`, {
      method: 'GET',
      headers: new Headers({
        'content-type': 'application/json',
      }),
    })
      .then(response => response.json())
      .then((responseData) => {
        if (responseData) {
          this.setState({ 'content': responseData.content });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { content } = this.state;

    return (
      <div className="Post">
        <h1>
          Your secure content:
          <br />
          {content}
        </h1>

      </div>
    );
  }
}

export default Main;
