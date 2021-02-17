import * as actionTypes from "../../actions/search/action-types"

import initialState from './initialState';

export default function Search(state = initialState, action) {
  switch (action.type) {
    case actionTypes.QUERY_SEARCH:
      return {
        ...state,
        querying: true,
        lastText: action.payload.text,
        items: [],
        pagination: action.payload.pagination
      }
      break;
    case actionTypes.PAGINATE_SEARCH:
      return {
        ...state,
        querying: true,
        lastText: action.payload.text,
        pagination: action.payload.pagination
      }
      break;
    case actionTypes.AGGREGATE_RESULTS:
      return {
        ...state,
        querying: false,
        lastText: action.payload.text,
        items: [
          ...state.items,
          ...action.payload.items
        ],
        pagination: action.payload.pagination
      }
      break;
    default:
      return { ...state }
  }
}