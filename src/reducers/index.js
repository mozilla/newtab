const c = require('lib/constants');
const formatHistoryTiles = require('lib/formatHistoryTiles');
const {updateState, parseBoolean} = require('lib/utils');

const initialState = {
  Search: {
    isLoading: false,
    searchString: '',
    suggestions: [],
    currentEngine: {
      name: '',
      placeholder: '',
      icons: []
    },
    engines: [],
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
        return updateState(state, {
          searchString: action.searchString
        });
      case c.REQUEST_SEARCH_SUGGESTIONS:
        return updateState(state, {
          isLoading: true
        });
      case c.RECEIVE_SEARCH_SUGGESTIONS:
        return updateState(state, {
          isLoading: false,
          suggestions: action.suggestions || []
        });
      case c.REQUEST_SEARCH_ENGINES:
        return updateState(state, {
          isLoading: true
        });
      case c.RECEIVE_SEARCH_ENGINES:
        return updateState(state, {
          isLoading: false,
          currentEngine: action.currentEngine,
          engines: action.engines
        });
      default:
        return state;
    }
  },

  Sites(state = initialState.Sites, action = null) {
    switch (action.type) {
      case c.REQUEST_SUGGESTED_DIRECTORY:
        return updateState(state, {
          isSuggestedLoading: true
        });
      case c.RECEIVE_SUGGESTED_DIRECTORY:
        return updateState(state, {
          isSuggestedLoading: false,
          suggested: action.suggested,
          directory: action.directory
        });
      case c.REQUEST_FRECENT:
        return updateState(state, {isHistoryLoading: true});
      case c.RECEIVE_FRECENT:
        return updateState(state, {
          isHistoryLoading: false,
          history: formatHistoryTiles(action.sites)
        });
      case c.REQUEST_SCREENSHOT:
        return state;
        // TODO: set loading state on individual tile
      case c.RECEIVE_SCREENSHOT:
        return updateState(state, {
          history: state.history.slice().map(tile => {
            if (tile.url !== action.url) return tile;
            return updateState(tile, {imageURI: action.imageURI, imageURI_2x: action.imageURI_2x});
          })
        });

      // LEGACY
      case c.REQUEST_INIT:
        return updateState(state, {isHistoryLoading: true});
      case c.RECEIVE_INIT:
        return updateState(state, {
          isHistoryLoading: false,
          history: formatHistoryTiles(action.history)
        });

      default:
        return state;
    }
  },

  Prefs(state = initialState.Prefs, action = null) {
    switch (action.type) {
      case c.RECEIVE_PREFS:
        return updateState(state, {
          locale: action.prefs.get('general.useragent.locale'),
          enabled: parseBoolean(action.prefs.get('browser.newtabpage.enabled')),
          showSuggested: parseBoolean(action.prefs.get('browser.newtabpage.enhanced'))
        });
      default:
        return state;
    }
  },

  Comm(state = initialState.Comm, action = null) {
    switch (action.type) {
      case c.REQUEST_INIT:
        return updateState(state, {
          isLoading: true
        });
      case c.RECEIVE_INIT:
        return updateState(state, {
          isLoading: false,
          isReady: true
        });
      default:
        return state;
    }
  }
};
