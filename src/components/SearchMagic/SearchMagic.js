const React = require('react');
const classnames = require('classnames');

const SearchMagic = React.createClass({
  render: function () {
    const currentEngine = this.props.currentEngine;
    const performSearch = this.props.performSearch;
    return (<div className={classnames('search-magic', {active: this.props.show})}>
      <section className="search-magic-title">
        {currentEngine.placeholder}
      </section>
      <section className="search-magic-suggestions" hidden={!this.props.suggestions.length}>
        <ul>
          {this.props.suggestions.map(suggestion => {
            return (<li key={suggestion}>
              <a onClick={() => performSearch({engineName: currentEngine.name, searchString: suggestion})}>{suggestion}</a>
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
            const icon = option.icons[0];
            return (<li key={option.name}>
              <a onClick={() => performSearch({engineName: option.name, searchString: this.props.searchString})}>
              <img width={icon.width} height={icon.height} src={icon.url} /></a>
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
  searchString: React.PropTypes.string,
  performSearch: React.PropTypes.func.isRequired
};

module.exports = SearchMagic;
