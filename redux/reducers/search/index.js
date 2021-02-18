import * as actionTypes from '../../actions/search/action-types';

import initialState from './initialState';

export default function Search(state = initialState, action) {
  switch (action.type) {
    case actionTypes.QUERY_SEARCH:
      return {
        ...state,
        querying: true,
        text: action.payload.text,
        engine: action.payload.engine,
        items: [],
        pagination: {
          page: 1,
        },
      };
    case actionTypes.PAGINATE_SEARCH:
      return {
        ...state,
        querying: true,
        pagination: action.payload.pagination,
      };
    case actionTypes.AGGREGATE_RESULTS:
      return {
        ...state,
        querying: false,
        items: [
          ...state.items,
          ...action.payload.items,
        ],
        pagination: action.payload.pagination,
      };
    default:
      return { ...state };
  }
}
