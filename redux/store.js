import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import initialState from './reducers/initialState';

import api from '../lib/api';

const createStoreWithMiddleware = applyMiddleware(
  thunk.withExtraArgument(api),
)(createStore);

export default createStoreWithMiddleware(rootReducer, initialState);
