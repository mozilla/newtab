'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const {connect} = require('react-redux');

const actions = require('actions/index');

const Tile = require('components/Tile/Tile');
const Search = require('components/Search/Search');
const Settings = require('components/Settings/Settings');

const App = React.createClass({
  componentWillMount: function () {
    this.props.dispatch(actions.getSuggestedDirectory());
    // TODO: replace with getHistory
    this.props.dispatch(actions.initComm());
    this.props.dispatch(actions.getPrefs());
  },
  render: function () {
    console.log(this.props.Prefs);
    const tiles = this.props.Directory.tiles.concat(this.props.History.tiles);
    return (<div>
      <Search />
      <div className="grid">
        {tiles.map((tile, index) => <Tile key={index} {...tile} />)}
      </div>
      <Settings />
    </div>);
  }
});

function select(state) {
  return state;
}

module.exports = connect(select)(App);
