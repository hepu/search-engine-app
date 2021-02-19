import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import querystring from 'querystring';

/* eslint-disable import/first */
process.env.API_URL = 'http://test.com';

import * as searchActions from '../../../actions/search';
import * as types from '../../../actions/search/action-types';
import initialState from '../../../reducers/initialState';
import api from '../../../../lib/api';

const mockStore = configureMockStore([thunk.withExtraArgument(api)]);

describe('search async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('query', () => {
    it('creates a AGGREGATE_RESULTS action after querying the search', () => {
      const text = 'testing';
      const engine = 'google';

      fetchMock.getOnce(`${process.env.API_URL}/search?${querystring.stringify({ text, engine })}`, {
        body: { items: [{ title: 'test' }], pagination: { page: 1 } },
        headers: { 'content-type': 'application/json' },
      });

      const store = mockStore(initialState);
      const expectedActions = [
        {
          type: types.QUERY_SEARCH,
          payload: {
            text,
            engine,
          },
        },
        {
          type: types.AGGREGATE_RESULTS,
          payload: {
            items: [{ title: 'test' }],
            pagination: {
              page: 1,
            },
          },
        },
      ];

      return store.dispatch(searchActions.query(text, { engine })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('paginate', () => {
    it('creates a AGGREGATE_RESULTS action after paginating the search', () => {
      const options = {
        text: 'testing',
        engine: 'google',
        page: 2,
      };

      fetchMock.getOnce(`${process.env.API_URL}/search?${querystring.stringify(options)}`, {
        body: { items: [{ title: 'test' }, { title: 'another' }], pagination: { page: options.page } },
        headers: { 'content-type': 'application/json' },
      });

      const store = mockStore({
        ...initialState,
        search: {
          text: options.text,
          engine: options.engine,
        },
      });
      const expectedActions = [
        {
          type: types.PAGINATE_SEARCH,
          payload: {
            pagination: {
              page: options.page,
            },
          },
        },
        {
          type: types.AGGREGATE_RESULTS,
          payload: {
            items: [{ title: 'test' }, { title: 'another' }],
            pagination: {
              page: options.page,
            },
          },
        },
      ];

      return store.dispatch(searchActions.paginate(options.page)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('changeText', () => {
    it('changes the text value', () => {
      const store = mockStore(initialState);
      const expectedActions = [
        {
          type: types.TEXT_CHANGE,
          payload: {
            text: 'new text',
          },
        },
      ];

      return store.dispatch(searchActions.changeText('new text')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('changeEngine', () => {
    it('changes the engine value', () => {
      const store = mockStore(initialState);
      const expectedActions = [
        {
          type: types.ENGINE_CHANGE,
          payload: {
            engine: 'bing',
          },
        },
      ];

      return store.dispatch(searchActions.changeEngine('bing')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
