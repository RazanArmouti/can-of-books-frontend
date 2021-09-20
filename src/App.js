import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BestBooks from './BestBooks';
import Nav from './components/NAV';
import Home from './components/Home';
import Profile from './components/Profile';

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

class App extends Component {

  render() {
    return (
      <div>
        <BestBooks />
        <br />
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/Profile">
              <Profile />
            </Route>

          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
