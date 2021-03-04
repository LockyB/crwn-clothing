import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist'; //allow us to persist store states in our app at localstorage

import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [];

//the process.env gives us the environment when app is running
//when we run in development mode, we use logger to help show the state changes
//otherwise, if it is in test/production, we do not apply any middlewares
if (process.env.NODE_ENV === 'development'){
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);