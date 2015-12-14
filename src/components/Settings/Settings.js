const React = require('react');

const Settings = React.createClass({
  getInitialState: function () {
    return {showMenu: false};
  },
  toggleMenu: function () {
    this.setState({showMenu: !this.state.showMenu});
  },
  render: function () {
    return (<div className="settings">
      <div className="settings-toggle-container">
        <button className="settings-toggle" onClick={this.toggleMenu}>
          <img src="./img/icon-gear.svg" />
        </button>
        <div className={'settings-menu' + (this.state.showMenu ? ' active' : '')}>
          <h3 className="settings-menu-title">New Tab Controls</h3>
          <ul>
            <li>Show your top sites</li>
            <li>Show a blank page</li>
            <li>Learn about new tab</li>
          </ul>
        </div>
      </div>
      <div className={'settings-overlay' + (this.state.showMenu ? ' active' : '')} onClick={this.toggleMenu}>
      </div>
    </div>);
  }
});

module.exports = Settings;
