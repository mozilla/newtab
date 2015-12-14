const c = require('lib/constants');
const Comm = require('lib/comm');
const Platform = require('lib/platform');

function request(type) {
  return {type};
}

function receive(type, data) {
  return Object.assign({type}, data);
}

module.exports = {
  getScreenshot(url) {
    return function next(dispatch) {
      dispatch(request(c.REQUEST_SCREENSHOT));
      dispatch(receive(c.RECEIVE_STATS, {url, imageURI}));
    };
  },

  getSuggestedDirectory() {
    return function next(dispatch) {
      dispatch(request(c.REQUEST_SUGGESTED_DIRECTORY));

      return fetch(c.SUGGESTED_TILES_URL)
        .then(response => response.json())
        .then(response => {
          dispatch(receive(c.RECEIVE_SUGGESTED, {tiles: response.suggested}));
          dispatch(receive(c.RECEIVE_DIRECTORY, {tiles: response.directory}));
        });
    };
  },

  initComm() {
    return function next(dispatch) {
      dispatch(request(c.REQUEST_INIT));

      // Get history and start listening for events
      // TODO: Replace with platform places API
      Comm.init(initialState => {
        dispatch(receive(c.RECEIVE_INIT, {placesLinks: initialState.placesLinks}));
      });
    };
  },

  getPrefs() {
    return function next(dispatch) {
      dispatch(receive(c.RECEIVE_PREFS, {prefs: Platform.prefs.getCurrent()}));
    }
  }
};
