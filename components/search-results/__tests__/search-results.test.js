import React from 'react';
import { shallow } from 'enzyme';

import SearchResults from '../search-results';
import SearchResult from '../../search-result';
import initialState from '../../../redux/reducers/search/initialState';

describe('SearchResults tests', () => {
  const paginateMockFn = jest.fn(() => { });
  const FullSearchResults = (
    <SearchResults
      search={{
        ...initialState,
        items: [
          {
            source: 'google',
            title: 'A title',
            url: 'http://google.com/something',
            description: 'A description',
            displayUrl: 'http://google.com',
          },
        ],
      }}
      searchActions={{
        paginate: paginateMockFn,
      }}
    />
  );
  const fullSearchResults = shallow(FullSearchResults);

  it('renders the given items', () => {
    expect(fullSearchResults.find(SearchResult).length).toBe(1);
  });

  it('renders a Load More btn', () => {
    expect(fullSearchResults.find('button').text()).toBe('Load More');
  });

  describe('Events', () => {
    describe('When clicking the submit button', () => {
      it('call the paginate search action function', () => {
        fullSearchResults.find('button').simulate('click');

        expect(paginateMockFn).toHaveBeenCalled();
      });
    });
  });
});
