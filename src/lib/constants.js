const constants = {
  SUGGESTED_TILES_URL: 'https://tiles.services.mozilla.com/v3/links/fetch/en-US/nightly'
};

// Add action names
[
  'REQUEST_SCREENSHOT',
  'RECEIVE_SCREENSHOT',
  'REQUEST_SUGGESTED_DIRECTORY',
  'RECEIVE_SUGGESTED',
  'RECEIVE_DIRECTORY',
  'REQUEST_INIT',
  'RECEIVE_INIT',
  'RECEIVE_PREFS'
].forEach(action => constants[action] = action);

module.exports = constants;
