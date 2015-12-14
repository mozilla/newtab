const React = require('react');
const classnames = require('classnames');

const SEARCH_OPTIONS = [
  'Yahoo',
  'Bing',
  'Amazon.com',
  'DuckDuckGo',
  'eBay',
  'Twitter',
  'Wikipedia'
];

const SearchMagic = React.createClass({
  setValue: function (text) {
    this.props.setValue(text);
  },
  render: function () {
    return (<div className={classnames('search-magic', {active: this.props.show})}>
      <section className="search-magic-title">
        {this.props.type} Search
      </section>
      <section className="search-magic-suggestions">
        <ul>
          {this.props.suggestions.map(text => <li key={text}><a onClick={() => this.setValue(text)}>{text}</a></li>)}
        </ul>
      </section>
      <section className="search-magic-title">
        Search for <strong>{this.props.value}</strong> with:
      </section>
      <section className="search-magic-other-search-partners">
        <ul>
          {SEARCH_OPTIONS.map(option => <li key={option}><a>{option}</a></li>)}
        </ul>
      </section>
      <section className="search-magic-settings">
        <button>
          Change Search Settings
        </button>
      </section>
    </div>);
  }
});

module.exports = SearchMagic;
