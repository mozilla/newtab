const c = require('lib/constants');
const {receive} = require('lib/utils');
const Platform = require('lib/platform');

module.exports = {
  getPrefs() {
    return function next(dispatch) {
      dispatch(receive(c.RECEIVE_PREFS, {prefs: Platform.prefs.getCurrent()}));
    };
  }
};
