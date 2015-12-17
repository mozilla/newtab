const c = require('lib/constants');
const {receive} = require('lib/utils');
const Platform = require('lib/platform');

module.exports = {
  /**
   * Initializes all the listeners needed to trigger updates
   * e.g. if a pref is changed, we want to dispatch a RECEIVE_PREFS action
   */
  addListeners() {
    return dispatch => {
      Platform.prefs.addEventListener('message', prefs => dispatch(receive(c.RECEIVE_PREFS, prefs)));
      Platform.search.addEventListener('message', engines => dispatch(receive(c.RECEIVE_SEARCH_ENGINES, engines)));
    };
  },

  /**
   * In case we need to tear down the base component for some reason,
   * remove all listeners.
   */
  removeListeners() {
    return dispatch => {
      Platform.prefs.removeListeners();
      Platform.search.removeListeners();
    };
  }
};
