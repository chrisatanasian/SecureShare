import React, { Component } from 'react';
import './App.css';

class App extends Component {
  submitPost() {
    // fetch('http://localhost:4000/posts/', {
    //   method: 'GET',
    //   headers: new Headers({
    //     'content-type': 'application/json',
    //   }),
    // })
    //   .then(response => response.json())
    //   .then((responseData) => {
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            SecureShare
          </h1>
          <form onSubmit={this.submitPost}>
            <label className="label">
              Enter your content to be securely shared:
              <textarea className="input" type="text" name="content" />
            </label>
            <input className="submit" type="submit" value="Submit" />
          </form>
        </header>
      </div>
    );
  }
}

export default App;
