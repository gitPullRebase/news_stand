import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import search from '../components/helpers/search';
import Home from '../components/Home';
import Login from '../components/Login';
import NotFound from '../components/NotFound';
import Profile from '../components/Profile';
import getPreferences from '../components/helpers/getPreferences';

import { getUser } from '../actions/appActions';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      user: {},
    };
  }

  componentDidMount() {
    axios
      .get('/auth')
      .then((authStatus) => {
        this.props.getUser(authStatus.data.loggedIn, authStatus.data.user);
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
            render={() => (
              <Home search={search} user={this.state.user} getPreferences={getPreferences} />
            )}
          />
          <Route path="/login" component={Login} />
          <Route
            path="/profile"
            render={() =>
              (this.props.loggedIn ? <Profile user={this.props.user} /> : <Redirect to="/" />)
            }
          />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn.loggedIn,
  user: state.loggedIn.user,
});

const mapDispatchToProps = dispatch => ({
  getUser: (loggedIn, user) => {
    dispatch(getUser(loggedIn, user));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
