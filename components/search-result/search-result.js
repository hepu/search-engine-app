import React from 'react';
import PropTypes from 'prop-types';

function SearchResult({
  url, title, description, displayUrl, source, duplicateCount,
}) {
  return (
    <div className="card mb-3">
      <div className="col">
        <div className="card-body">
          <small>
            <a className="text-info" href={url}>{displayUrl}</a>
            {' '}
            -
            {' '}
            <span className="text-muted">{source}</span>
            {duplicateCount && (
              <span className="text-muted">
                {' '}
                -
                {' '}
                Duplicated results:
                {' '}
                {duplicateCount}
              </span>
            )}
          </small>
          <h5 className="card-title text-primary"><a href={url}>{title}</a></h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
}

SearchResult.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  displayUrl: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  duplicateCount: PropTypes.string.isRequired,
};

export default SearchResult;
