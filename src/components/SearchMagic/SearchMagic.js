const React = require('react');
const classnames = require('classnames');
const Platform = require('lib/platform');

const SearchMagic = React.createClass({
  render: function () {
    const currentEngine = this.props.currentEngine;
    const performSearch = Platform.search.performSearch;

    return (<div className={classnames('search-magic', {active: this.props.show})}>
      <section className="search-magic-title">
        {currentEngine.placeholder}
      </section>
      <section className="search-magic-suggestions">
        <ul>
          {this.props.suggestions.map(suggestion => {
            return (<li key={suggestion}>
              <a onClick={() => performSearch({engine: currentEngine.name, searchString: suggestion})}>{suggestion}</a>
            </li>);
          })}
        </ul>
      </section>
      <section className="search-magic-title">
        Search for <strong>{this.props.searchString}</strong> with:
      </section>
      <section className="search-magic-other-search-partners">
        <ul>
          {this.props.engines.map(option => {
            return (<li key={option.name}>
              <a onClick={() => performSearch({engine: currentEngine.name, searchString: this.props.searchString})}>{option.name}</a>
            </li>);
          })}
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

const EngineShape = React.PropTypes.shape({
  name: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string.isRequired
});

SearchMagic.propTypes = {
  currentEngine: EngineShape.isRequired,
  suggestions: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  engines: React.PropTypes.arrayOf(EngineShape).isRequired,
  searchString: React.PropTypes.string
};

module.exports = SearchMagic;
