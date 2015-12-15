const React = require('react');
const {connect} = require('react-redux');

const actions = require('actions/index');

const Tile = require('components/Tile/Tile');
const Search = require('components/Search/Search');
const Settings = require('components/Settings/Settings');

const Base = React.createClass({
  componentWillMount: function () {
    this.props.dispatch(actions.getPrefs());
    this.props.dispatch(actions.getSuggestedDirectory());

    // This sets up the comm stuff.
    // TODO: replace with getHistory
    this.props.dispatch(actions.initComm());
  },
  render: function () {
    const prefs = this.props.Prefs;
    let tiles = this.props.Sites.history;

    if (prefs.showSuggested) {
      tiles = this.props.Sites.suggested.concat(this.props.Sites.directory).concat(tiles);
    }

    return (<div>
      <Search />
      <div className="grid" hidden={!prefs.enabled}>
        {tiles.map((tile, index) => <Tile key={index} {...tile} />)}
      </div>
      <Settings />
    </div>);
  }
});

function select(state) {
  return state;
}

module.exports = connect(select)(Base);
