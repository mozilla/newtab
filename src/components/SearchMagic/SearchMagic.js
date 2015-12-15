const React = require('react');
const classnames = require('classnames');

const SearchMagic = React.createClass({
  render: function () {
    const currentEngine = this.props.currentEngine;
    return (<div className={classnames('search-magic', {active: this.props.show})}>
      <section className="search-magic-title">
        {currentEngine.placeholder}
      </section>
      <section className="search-magic-suggestions">
        <ul>
          {this.props.suggestions.map(suggestion => {
            return (<li key={suggestion}>
              <a onClick={() => currentEngine.performSearch(suggestion)}>{suggestion}</a>
            </li>);
          })}
        </ul>
      </section>
      <section className="search-magic-title">
        Search for <strong>{this.props.value}</strong> with:
      </section>
      <section className="search-magic-other-search-partners">
        <ul>
          {this.props.otherEngines.map(option => {
            return (<li key={option.name}>
              <a onClick={() => option.performSearch(this.props.value)}>{option.name}</a>
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
  placeholder: React.PropTypes.string.isRequired,
  performSearch: React.PropTypes.func.isRequired
});

SearchMagic.propTypes = {
  currentEngine: EngineShape.isRequired,
  suggestions: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  otherEngines: React.PropTypes.arrayOf(EngineShape).isRequired
};

module.exports = SearchMagic;
