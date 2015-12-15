module.exports.updateState = function updateState(state, newState) {
  return Object.assign({}, state, newState);
};
