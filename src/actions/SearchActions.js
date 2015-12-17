const c = require('lib/constants');
const {request, receive} = require('lib/utils');
const Platform = require('lib/platform');
const async = require('lib/async');

module.exports = {
  getSuggestions(engineName, searchString) {
    return async(function* (dispatch) {
      dispatch(request(c.REQUEST_SEARCH_SUGGESTIONS));
      const suggestions = yield Platform.search.getSuggestions({
        searchString,
        engineName
      });
      dispatch(receive(c.RECEIVE_SEARCH_SUGGESTIONS, {suggestions}));
    });
  },

  getSearchEngines: function () {
    return async(function* (dispatch) {
      dispatch(request(c.REQUEST_SEARCH_ENGINES));

      const currentEngine = yield Platform.search.getCurrentEngine();
      const engines = yield Platform.search.getVisibleEngines();

      dispatch(receive(c.RECEIVE_SEARCH_ENGINES, {currentEngine, engines}));
    });
  },

  updateSearchString(searchString) {
    return function next(dispatch) {
      dispatch(receive(c.UPDATE_SEARCH_STRING, {searchString}));
    };
  }
};
