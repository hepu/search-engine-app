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
    case actionTypes.TEXT_CHANGE:
      return {
        ...state,
        text: action.payload.text,
      };
    case actionTypes.ENGINE_CHANGE:
      return {
        ...state,
        engine: action.payload.engine,
      };
    default:
      return { ...state };
  }
}
