import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';

import SearchResults from '../search-results';
import SearchResultsComponent from '../../../components/search-results';
import initialState from '../../../redux/reducers/initialState';
import reducer from '../../../redux/reducers';

const store = createStore(reducer, initialState);

describe('SearchResults container tests', () => {
  const FullSearchResults = <SearchResults store={store} />;
  const fullSearchResults = shallow(FullSearchResults);

  it('renders a SearchResults component', () => {
    expect(fullSearchResults.find(SearchResultsComponent).length).toBe(1);
  });
});
