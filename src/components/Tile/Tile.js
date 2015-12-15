const React = require('react');

const Tile = React.createClass({
  onClick: function (e, url) {
    e.preventDefault();
    this.props.goToUrl(this.props.url);
  },
  render: function () {
    return (<a className="tile" href={this.props.url} onClick={this.onClick}>
      <div className="tile-img-container">
        {this.props.imageURI && <div className="tile-img" style={{backgroundImage: `url(${this.props.imageURI})`}} />}
        {this.props.enhancedImageURI && <div className="tile-img-rollover" style={{backgroundImage: `url(${this.props.enhancedImageURI})`}} />}
      </div>
      <div className="tile-title">
        {this.props.title}
      </div>
    </a>);
  }
});

Tile.propTypes = {
  title: React.PropTypes.string.isRequired,
  imageURI: React.PropTypes.string,
  enhancedImageURI: React.PropTypes.string,
  goToUrl: React.PropTypes.func.isRequired,
  url: React.PropTypes.string.isRequired
};

module.exports = Tile;
