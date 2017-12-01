import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import search from '../components/helpers/search.js';
import Home from '../components/Home.js';
import Login from '../components/Login.js';
import NotFound from '../components/NotFound.js';
import Profile from '../components/Profile.js';
import getPreferences from '../components/helpers/getPreferences.js';
import CommentPage from '../components/CommentPage';

import { getUser } from '../actions/appActions.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      user: {},
      article: {},
    };
  }

  componentDidMount() {
    axios
      .get('/auth')
      .then((authStatus) => {
        this.setState({
          loggedIn: authStatus.data.loggedIn,
          user: authStatus.data.user,
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Home search={search} getPreferences={getPreferences} />}
          />
          <Route path="/login" component={Login} />
          <Route
            path="/profile"
            render={() =>
              (this.state.loggedIn ? <Profile user={this.state.user} /> : <Redirect to="/" />)
            }
          />
          <Route path="/comments" component={() => <CommentPage article={this.state.article} />} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  getUser: (loggedIn, user) => {
    dispatch(getUser(loggedIn, user));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
