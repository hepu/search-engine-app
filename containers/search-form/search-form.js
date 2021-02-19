import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchFormComponent from '../../components/search-form';

import * as searchActions from '../../redux/actions/search';

const mapStateToProps = (state) => ({
  search: state.search,
});

const mapDispatchToProps = (dispatch) => ({
  searchActions: bindActionCreators(searchActions, dispatch),
});

const SearchForm = connect(mapStateToProps, mapDispatchToProps)(SearchFormComponent);

export default SearchForm;
