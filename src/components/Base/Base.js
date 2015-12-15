const React = require('react');
const {connect} = require('react-redux');

const Platform = require('lib/platform');
const actions = require('actions/index');

const Tile = require('components/Tile/Tile');
const Search = require('components/Search/Search');
const Settings = require('components/Settings/Settings');

const Base = React.createClass({
  componentWillMount: function () {
    this.props.dispatch(actions.getPrefs());
    this.props.dispatch(actions.getSuggestedDirectory());
    this.props.dispatch(actions.getSearchEngines());

    // Fake
    this.props.dispatch(actions.getFrecentSites());
    this.props.dispatch(actions.addListeners());

    // Legacy
    // this.props.dispatch(actions.initComm());
  },
  render: function () {
    const prefs = this.props.Prefs;
    const {history, suggested, directory} = this.props.Sites;
    let tiles = history;
    if (prefs.showSuggested) tiles = tiles.concat(suggested).concat(directory);

    return (<div>
      <Search />
      <div className="grid" hidden={!prefs.enabled}>
        {tiles.map((tile, index) => <Tile key={index} {...tile} goToUrl={Platform.goToUrl} />)}
      </div>
      <Settings {...prefs} setPrefs={p => Platform.prefs.set(p)} />
    </div>);
  }
});

function select(state) {
  return state;
}

module.exports = connect(select)(Base);
