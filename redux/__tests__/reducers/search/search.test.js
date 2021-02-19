import reducer from '../../../reducers/search';
import initialState from '../../../reducers/search/initialState';
import * as types from '../../../actions/search/action-types';

describe('search reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('handles SEARCH.QUERY_SEARCH', () => {
    expect(
      reducer(undefined, {
        type: types.QUERY_SEARCH,
        payload: {
          text: 'test',
          engine: 'google',
        },
      }),
    ).toEqual({
      ...initialState,
      querying: true,
      text: 'test',
      engine: 'google',
      pagination: {
        page: 1,
      },
    });
  });

  it('handles SEARCH.PAGINATE_SEARCH', () => {
    expect(
      reducer(undefined, {
        type: types.PAGINATE_SEARCH,
        payload: {
          pagination: {
            page: 2,
          },
        },
      }),
    ).toEqual({
      ...initialState,
      querying: true,
      pagination: {
        page: 2,
      },
    });
  });

  it('handles SEARCH.AGGREGATE_RESULTS', () => {
    expect(
      reducer(undefined, {
        type: types.AGGREGATE_RESULTS,
        payload: {
          items: [
            {
              title: 'test',
            },
          ],
          pagination: {
            page: 2,
          },
        },
      }),
    ).toEqual({
      ...initialState,
      items: [
        {
          title: 'test',
        },
      ],
      pagination: {
        page: 2,
      },
    });
  });

  it('handles SEARCH.TEXT_CHANGE', () => {
    expect(
      reducer(undefined, {
        type: types.TEXT_CHANGE,
        payload: {
          text: 'test',
        },
      }),
    ).toEqual({
      ...initialState,
      text: 'test',
    });
  });

  it('handles SEARCH.ENGINE_CHANGE', () => {
    expect(
      reducer(undefined, {
        type: types.ENGINE_CHANGE,
        payload: {
          engine: 'bing',
        },
      }),
    ).toEqual({
      ...initialState,
      engine: 'bing',
    });
  });
});
