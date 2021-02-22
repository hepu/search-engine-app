import React from 'react';
import PropTypes from 'prop-types';

import SearchResult from '../search-result';
import Loader from '../loader';
import SearchTypes from '../../redux/actions/search/types';
import SearchType from '../../redux/reducers/search/types';

function SearchResults({ search, searchActions }) {
  const { querying, items, pagination } = search;

  const onNextPage = () => {
    if (!querying) {
      searchActions.paginate(pagination.page + 1);
    }
  };

  const renderItems = () => items.map((item) => (
    <SearchResult
      key={`search-result-${item.url}`}
      url={item.url}
      title={item.title}
      description={item.description}
      displayUrl={item.displayUrl}
      source={item.source}
      duplicateCount={item.duplicate_count}
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
  search: PropTypes.shape(SearchType).isRequired,
  searchActions: PropTypes.instanceOf(SearchTypes).isRequired,
};

export default SearchResults;
