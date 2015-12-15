const c = require('lib/constants');
const Comm = require('lib/comm');
const Platform = require('lib/platform');

function request(type) {
  return {type};
}

function receive(type, data) {
  return Object.assign({type}, data);
}

const relayEvents = new Map([
  'NewTab:ContentSearchService'
].map(event => [event, event]));

// This triggers actions received from comm
// NOTE: All case statements MUST be in relayEvents
function commRelay(dispatch) {
  return function onMessage(event, data) {
    switch (event) {
      case relayEvents.get('NewTab:ContentSearchService'):
        switch (data.name) {
          case 'Suggestions':
            return dispatch(receive(c.RECEIVE_SEARCH_SUGGESTIONS, {suggestions: data.suggestion.remote}));
          default:
            return null;
        }
        break;
      default:
        return null;
    }
  };
}

module.exports = {
  getSiteThumbnail(url) {
    return function next(dispatch) {
      dispatch(request(c.REQUEST_SCREENSHOT));
      Platform.sites.getThumbnail(url)
        .then(response => dispatch(receive(c.RECEIVE_SCREENSHOT, Object.assign({url}, response))));
    };
  },

  getSuggestedDirectory() {
    return function next(dispatch) {
      dispatch(request(c.REQUEST_SUGGESTED_DIRECTORY));
      return fetch(c.SUGGESTED_TILES_URL)
        .then(response => response.json())
        .then(response => dispatch(receive(c.RECEIVE_SUGGESTED_DIRECTORY, response)));
    };
  },

  getFrecentSites() {
    return dispatch => {
      dispatch(request(c.REQUEST_FRECENT));
      return Platform.sites.getFrecent()
        .then(sites => {
          sites.forEach(site => dispatch(this.getSiteThumbnail(site.url)));
          dispatch(receive(c.RECEIVE_FRECENT, {sites}));
        });
    };
  },

  initComm() {
    return function next(dispatch) {
      dispatch(request(c.REQUEST_INIT));
      // Get history and start listening for events
      // TODO: Replace with platform places API
      Comm.init(initialState => {
        // Set up relay
        Comm.all(relayEvents, commRelay(dispatch));

        dispatch(receive(c.RECEIVE_INIT, {history: initialState.placesLinks}));
      });
    };
  },

  getPrefs() {
    return function next(dispatch) {
      dispatch(receive(c.RECEIVE_PREFS, {prefs: Platform.prefs.getCurrent()}));
    };
  },

  // Old message passing
  getSearchSuggestions(searchString) {
    return function next(dispatch) {
      dispatch(request(c.REQUEST_SEARCH_SUGGESTIONS));
      Comm.dispatch('NewTab:GetSuggestions', {
        engineName: 'Google',
        searchString,
        remoteTimeout: undefined
      });
    };
  },

  // Faked
  getSuggestions(searchString, engineName) {
    return function next(dispatch) {
      dispatch(request(c.REQUEST_SEARCH_SUGGESTIONS));
      Platform.search.getSuggestions({
        searchString,
        engineName
      }).then(suggestions => {
        dispatch(receive(c.RECEIVE_SEARCH_SUGGESTIONS, {suggestions}));
      });
    };
  },

  getSearchEngines() {
    return function next(dispatch) {
      dispatch(request(c.REQUEST_SEARCH_ENGINES));
      // Platform.search.getSearchEngines()
      //   .then(results => {
      //     dispatch(receive(c.RECEIVE_SEARCH_ENGINES, results));
      //   });
    };
  },

  updateSearchString(searchString) {
    return function next(dispatch) {
      dispatch(receive(c.UPDATE_SEARCH_STRING, {searchString}));
    };
  },

  /**
   * Initializes all the listeners needed to trigger updates
   * e.g. if a pref is changed, we want to dispatch a RECEIVE_PREFS action
   */
  addListeners() {
    return dispatch => {
      Platform.prefs.addEventListener(prefs => dispatch(receive(c.RECEIVE_PREFS, prefs)));
      Platform.search.addEventListener(engines => dispatch(receive(c.RECEIVE_SEARCH_ENGINES, engines)));
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
