import React from 'react';
import { shallow } from 'enzyme';

import SearchResult from '../search-result';

describe('SearchResult tests', () => {
  const FullSearchResult = (
    <SearchResult
      url="http://google.com"
      title="Some title"
      description="Some description"
      displayUrl="http://google.com"
      source="google"
      duplicateCount="2"
    />
  );
  const fullSearchResult = shallow(FullSearchResult);

  it('renders the search result data', () => {
    expect(fullSearchResult.text()).toBe('http://google.com - google - Duplicated results: 2Some titleSome description');
  });
});
