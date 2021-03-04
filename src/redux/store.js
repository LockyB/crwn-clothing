import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist'; //allow us to persist store states in our app at localstorage

import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);