import * as actionTypes from './action-types';

export function query(text, options = {}) {
  return async (dispatch, getState, api) => {
    dispatch({
      type: actionTypes.QUERY_SEARCH,
      payload: {
        text,
        engine: options.engine,
      },
    });

    const response = await api.search({ text, ...options });
    let newItems = [];
    let newPagination = { page: 1 };

    if (response.items) {
      newItems = response.items;
      newPagination = response.pagination;
    }

    dispatch({
      type: actionTypes.AGGREGATE_RESULTS,
      payload: {
        items: newItems,
        pagination: newPagination,
      },
    });
  };
}

export function paginate(page) {
  return async (dispatch, getState, api) => {
    const { text, engine } = getState().search;

    dispatch({
      type: actionTypes.PAGINATE_SEARCH,
      payload: {
        pagination: { page },
      },
    });

    const response = await api.search({ text, engine, page });
    let newItems = [];
    let newPagination = { page };

    if (response.items) {
      newItems = response.items;
      newPagination = response.pagination;
    }

    dispatch({
      type: actionTypes.AGGREGATE_RESULTS,
      payload: {
        items: newItems,
        pagination: newPagination,
      },
    });
  };
}

export function changeText(text) {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.TEXT_CHANGE,
      payload: {
        text,
      },
    });
  };
}

export function changeEngine(engine) {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.ENGINE_CHANGE,
      payload: {
        engine,
      },
    });
  };
}
