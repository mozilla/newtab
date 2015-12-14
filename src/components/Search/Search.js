const React = require('react');

const Search = React.createClass({
  getInitialState: function () {
    return {
      focus: false
    };
  },
  onFocusInput: function () {
    this.setState({focus: true});
  },
  onBlurInput: function () {
    this.setState({focus: false});
  },
  render: function () {
    return (<form className="search">
      <div className="search-input-wrapper">
        <div className="search-icon" />
        <input className="search-input" type="search" onFocus={this.onFocusInput} />
        <button className="search-submit">Search</button>
      </div>
    </form>);
  }
});

module.exports = Search;
