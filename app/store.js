import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import loggedIn from './reducers/appReducer.js';
import home from './reducers/homeReducer.js';
import favorite from './reducers/favoriteReducer.js';

export default createStore(
  combineReducers({
    loggedIn,
    home,
    favorite,
  }),
  {},
  applyMiddleware(createLogger(), thunk, promise()),
);
