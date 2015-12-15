const React = require('react');

const Tile = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    imageURI: React.PropTypes.string,
    enhancedImageURI: React.PropTypes.string
  },
  onClick: function (e, url) {
    e.preventDefault();
    // TODO: send browser to site properly.
    // this stays in iframe
    window.location = url;
  },
  render: function () {
    return (<a className="tile" href={this.props.url} onClick={e => this.onClick(e, this.props.url)}>
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

module.exports = Tile;
