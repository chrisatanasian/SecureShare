import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Main from './Main';

const App = () => (
  <Router>
    <div>
      <Route path="/" exact component={Main} />
      <Route path="/:slug" component={Main} />
    </div>
  </Router>
)

export default App;
