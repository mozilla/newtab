const c = require('lib/constants');
const formatHistoryTiles = require('lib/formatHistoryTiles');
const {updateState} = require('lib/utils');

const initialState = {
  Search: {
    searchString: '',
    suggestions: [],
    currentSearchEngine: '',
    searchOptions: []
  },

  Sites: {
    suggested: [],
    directory: [],
    history: [],
    isSuggestedLoading: false,
    isHistoryLoading: false
  },

  Prefs: {
    locale: 'en-US',
    enabled: true,
    showSuggested: true
  },

  // TODO: remove we we get rid of all comm stuff
  Comm: {
    isReady: false,
    isLoading: false
  }
};

module.exports = {

  Search(state = initialState.Search, action = null) {
    switch (action.type) {
      case c.UPDATE_SEARCH_STRING:
        return Object.assign({}, state, {
          searchString: action.searchString
        });
      case c.REQUEST_SEARCH_SUGGESTIONS:
        return Object.assign({}, state, {
          isLoading: true
        });
      case c.RECEIVE_SEARCH_SUGGESTIONS:
        return Object.assign({}, state, {
          isLoading: false,
          suggestions: action.suggestions || []
        });
      default:
        return state;
    }
  },

  Sites(state = initialState.Sites, action = null) {
    switch (action.type) {
      case c.REQUEST_SUGGESTED_DIRECTORY:
        return Object.assign({}, state, {
          isSuggestedLoading: true
        });
      case c.RECEIVE_SUGGESTED_DIRECTORY:
        return Object.assign({}, state, {
          isSuggestedLoading: false,
          suggested: action.suggested,
          directory: action.directory
        });
      case c.REQUEST_INIT:
        return updateState(state, {isHistoryLoading: true});
      case c.RECEIVE_INIT:
        return updateState(state, {
          isHistoryLoading: false,
          history: formatHistoryTiles(action.history)
        });
      case c.REQUEST_SCREENSHOT:
        return state;
        // TODO: set loading state on individual tile
      case c.RECEIVE_SCREENSHOT:
        return updateState(state, {
          history: state.history.slice().map(tile => {
            if (tile.url !== action.url) return tile;
            return updateState(tile, {imageURI: action.imageURI});
          })
        });
      default:
        return state;
    }
  },

  Prefs(state = initialState.Prefs, action = null) {
    switch (action.type) {
      case c.RECEIVE_PREFS:
        return Object.assign({}, state, {
          locale: action.prefs.get('general.useragent.locale'),
          enabled: action.prefs.get('browser.newtabpage.enabled') === 'true',
          showSuggested: action.prefs.get('browser.newtabpage.enhanced') === 'true'
        });
      default:
        return state;
    }
  },

  Comm(state = initialState.Comm, action = null) {
    switch (action.type) {
      case c.REQUEST_INIT:
        return Object.assign({}, state, {
          isLoading: true
        });
      case c.RECEIVE_INIT:
        return Object.assign({}, state, {
          isLoading: false,
          isReady: true
        });
      default:
        return state;
    }
  }

};
