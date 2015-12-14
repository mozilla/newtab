const React = require('react');
const SearchMagic = require('components/SearchMagic/SearchMagic');
const {connect} = require('react-redux');
const actions = require('actions/index');

const Search = React.createClass({
  getInitialState: function () {
    return {
      focus: false
    };
  },
  setValueAndSuggestions: function (value) {
    this.props.dispatch(actions.updateSearchString(value));
    this.props.dispatch(actions.getSearchSuggestions(value));
  },
  setValueAndClose: function (value) {
    this.props.dispatch(actions.updateSearchString(value));
    this.refs.input.blur();
  },
  render: function () {
    const searchString = this.props.Search.searchString;
    return (<form className="search">
      <div className="search-input-wrapper">
        <div className="search-icon" />
        <input ref="input" className="search-input" type="search"
          value={searchString}
          onChange={e => this.setValueAndSuggestions(e.target.value)}
          onFocus={() => this.setState({focus: true})}
          onBlur={() => setTimeout(() => this.setState({focus: false}), 200)} />
        <button className="search-submit">Search</button>
        <SearchMagic
          show={searchString && this.state.focus}
          value={searchString}
          type={'Google'}
          suggestions={this.props.Search.suggestions}
          setValue={this.setValueAndClose} />
      </div>
    </form>);
  }
});

function select(state) {
  return {
    Search: state.Search
  };
}

module.exports = connect(select)(Search);
