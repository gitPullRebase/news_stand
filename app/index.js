import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './public/assets/styles.css';

<<<<<<< HEAD
import App from './containers/App.js';
import store from './store.js';
=======
import App from './containers/App';
import store from './store';
>>>>>>> fixed conflicts

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
