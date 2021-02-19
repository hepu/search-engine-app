import React from 'react';
import PropTypes from 'prop-types';

import SearchTypes from '../../redux/actions/search/types';
import SearchType from '../../redux/reducers/search/types';

function SearchForm({ search, searchActions }) {
  const { querying, text, engine } = search;

  const onTextChange = (event) => {
    searchActions.changeText(event.currentTarget.value);
  };

  const onEngineChange = (event) => {
    searchActions.changeEngine(event.currentTarget.value);
  };

  const onSearch = () => {
    if (text.trim().length > 0) {
      searchActions.query(text, { engine });
    }
  };

  const onEnterKeyPress = (event) => {
    if (event.charCode === 13) {
      onSearch();
    }
  };

  return (
    <section className="form-group row mt-4">
      <div className="col mb-2">
        <input
          type="text"
          className="form-control"
          id="text"
          name="text"
          aria-describedby="searchText"
          placeholder="Type your search..."
          value={text}
          onChange={onTextChange}
          onKeyPress={onEnterKeyPress}
          disabled={querying}
        />
      </div>
      <div className="col-lg-2 mb-2">
        <select
          className="custom-select"
          onChange={onEngineChange}
          value={engine}
          disabled={querying}
          onKeyPress={onEnterKeyPress}
        >
          <option value="google">Google</option>
          <option value="bing">Bing</option>
          <option value="both">Both</option>
        </select>
      </div>
      <div className="col-lg-2 mb-2 text-right">
        <button type="submit" className="btn btn-primary btn-block" onClick={onSearch} disabled={querying || text.trim().length === 0}>Search</button>
      </div>
    </section>
  );
}

SearchForm.propTypes = {
  search: PropTypes.shape(SearchType).isRequired,
  searchActions: PropTypes.instanceOf(SearchTypes).isRequired,
};

export default SearchForm;
