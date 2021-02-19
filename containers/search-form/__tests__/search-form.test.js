import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';

import SearchForm from '../search-form';
import SearchFormComponent from '../../../components/search-form';
import initialState from '../../../redux/reducers/initialState';
import reducer from '../../../redux/reducers';

const store = createStore(reducer, initialState);

describe('SearchForm container tests', () => {
  const FullSearchForm = <SearchForm store={store} />;
  const fullSearchForm = shallow(FullSearchForm);

  it('renders a SearchForm component', () => {
    expect(fullSearchForm.find(SearchFormComponent).length).toBe(1);
  });
});
