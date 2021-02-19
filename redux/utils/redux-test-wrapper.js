import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import initialState from '../reducers/initialState';
import reducer from '../reducers';

const store = createStore(reducer, initialState);

function ReduxTestWrapper({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

ReduxTestWrapper.propTypes = {
  children: PropTypes.node,
};

ReduxTestWrapper.defaultProps = {
  children: null,
};

export default ReduxTestWrapper;
