module.exports = function log() {
  console.log.apply(console, arguments); // eslint-disable-line no-console
};
