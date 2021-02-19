import PropTypes from 'prop-types';

import { ENGINES } from './constants';

export default {
  text: PropTypes.string.isRequired,
  engine: PropTypes.oneOf(Object.values(ENGINES)),
  querying: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    source: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    displayUrl: PropTypes.string.isRequired,
  })),
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
  }),
};
