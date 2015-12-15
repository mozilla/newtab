module.exports.updateState = function updateState(state, newState) {
  return Object.assign({}, state, newState);
};

module.exports.parseBoolean = function parseBoolean(value) {
  return typeof value === 'string' ? value === 'true' : !!value;
};
