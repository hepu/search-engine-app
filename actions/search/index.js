import * as actionTypes from "./action-types"

import Api from "../../lib/api"

export function query(text, options = {}) {
  return async (dispatch) => {
    dispatch({ type: actionTypes.QUERY_SEARCH, payload: { pagination: { page: 1 } } })

    const response = await Api.search({ text, ...options })
    let newItems = []
    let newPagination = { page: 1 }
    
    if (response.items) {
      newItems = response.items
      newPagination = response.pagination
    }

    dispatch({
      type: actionTypes.AGGREGATE_RESULTS,
      payload: {
        text: text,
        items: newItems,
        pagination: newPagination
      }
    })
  }
}

export function paginate(text, options = {}) {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.PAGINATE_SEARCH,
      payload: {
        pagination: { page: options.page }
      }
    })
    
    const response = await Api.search({ text, ...options })
    let newItems = []
    let newPagination = { page: options.page }
    
    if (response.items) {
      newItems = response.items
      newPagination = response.pagination
    }

    dispatch({
      type: actionTypes.AGGREGATE_RESULTS,
      payload: {
        text: text,
        items: newItems,
        pagination: newPagination
      }
    })
  }
}

export default { query, paginate }