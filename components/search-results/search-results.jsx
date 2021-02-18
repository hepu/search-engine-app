import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { SearchTypes } from '../../redux/actions/search';

import SearchResult from '../search-result';
import Loader from '../loader';

function SearchResults({ searchActions }) {
  const { querying, items, pagination } = useSelector((state) => state.search);

  const onNextPage = () => {
    searchActions.paginate(pagination.page + 1);
  };

  const renderItems = () => items.map((item) => (
    <SearchResult
      key={`search-result-${item.url}`}
      url={item.url}
      title={item.title}
      description={item.description}
      displayUrl={item.displayUrl}
      source={item.source}
    />
  ));

  const renderPagination = () => (
    <div className="text-center mb-4">
      <nav aria-label="Load more pagination">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button type="button" className="page-link" onClick={onNextPage}>Load More</button>
          </li>
        </ul>
      </nav>
    </div>
  );

  return (
    <section className="row">
      <div className="col">
        {renderItems()}
        {querying && <Loader />}
        {items.length > 0 && renderPagination()}
      </div>
    </section>
  );
}

SearchResults.propTypes = {
  searchActions: PropTypes.instanceOf(SearchTypes).isRequired,
};

export default SearchResults;
