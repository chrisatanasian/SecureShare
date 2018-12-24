import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './Main';
import Post from './Post';

const App = () => (
  <Router>
    <div>
      <Route path="/" exact component={Main} />
      <Route path="/:slug" component={Post} />
    </div>
  </Router>
)

export default App;
