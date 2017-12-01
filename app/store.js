import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

<<<<<<< HEAD
import loggedIn from './reducers/appReducer.js';
=======
import loggedIn from './reducers/appReducer';
>>>>>>> fixed conflicts

export default createStore(
  combineReducers({ loggedIn }),
  {},
<<<<<<< HEAD
  applyMiddleware(createLogger(), thunk, promise()),
=======
  applyMiddleware(logger(), thunk, promise()),
>>>>>>> fixed conflicts
);
