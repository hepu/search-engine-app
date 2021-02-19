import React from 'react';
import { shallow } from 'enzyme';

import SearchForm from '../search-form';
import initialState from '../../../redux/reducers/search/initialState';

describe('SearchForm tests', () => {
  const queryMockFn = jest.fn(() => { });
  const FullSearchForm = (
    <SearchForm
      search={{
        ...initialState,
        text: 'test',
      }}
      searchActions={{
        query: queryMockFn,
      }}
    />
  );
  const fullSearchForm = shallow(FullSearchForm);

  it('renders an <input> tag', () => {
    expect(fullSearchForm.find('input')).not.toBe(null);
  });

  it('renders a <select> tag', () => {
    expect(fullSearchForm.find('select')).not.toBe(null);
  });

  it('renders a <button> tag', () => {
    expect(fullSearchForm.find('button')).not.toBe(null);
  });

  describe('Events', () => {
    describe('When clicking the submit button', () => {
      it('call the query search action function', () => {
        fullSearchForm.find('button').simulate('click');

        expect(queryMockFn).toHaveBeenCalled();
      });
    });
  });
});
