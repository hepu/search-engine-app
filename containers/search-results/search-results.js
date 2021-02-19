import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchResultsComponent from '../../components/search-results';

import * as searchActions from '../../redux/actions/search';

const mapStateToProps = (state) => ({
  search: state.search,
});

const mapDispatchToProps = (dispatch) => ({
  searchActions: bindActionCreators(searchActions, dispatch),
});

const SearchResults = connect(mapStateToProps, mapDispatchToProps)(SearchResultsComponent);

export default SearchResults;
