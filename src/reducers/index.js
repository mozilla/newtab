const c = require('lib/constants');
const formatHistoryTiles = require('lib/formatHistoryTiles');

module.exports = {
  Comm(state = {isReady: false, isLoading: false}, action = null) {
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
  },

  History(state = {tiles: [], isLoading: false}, action = null) {
    switch (action.type) {
      case c.REQUEST_INIT:
        return Object.assign({}, state, {
          isLoading: true
        });
      case c.RECEIVE_INIT:
        return Object.assign({}, state, {
          isLoading: false,
          tiles: formatHistoryTiles(action.placesLinks)
        });
      case c.REQUEST_SCREENSHOT:
        return state;
        // TODO: set loading state on individual tile
      case c.RECEIVE_SCREENSHOT:
        return Object.assign({}, state, {
          tiles: state.tiles.slice().map(tile => {
            if (tile.url !== action.url) return tile;
            return Object.assign({}, tile, {imageURI: action.imageURI});
          })
        });
      default:
        return state;
    }
  },

  Suggested(state = {tiles: [], isLoading: false}, action = null) {
    switch (action.type) {
      case c.REQUEST_SUGGESTED_DIRECTORY:
        return Object.assign({}, state, {
          isLoading: true
        });
      case c.RECEIVE_SUGGESTED:
        return Object.assign({}, state, {
          isLoading: false,
          tiles: action.tiles
        });
      default:
        return state;
    }
  },

  Directory(state = {tiles: [], isLoading: false}, action = null) {
    switch (action.type) {
      case c.REQUEST_SUGGESTED_DIRECTORY:
        return Object.assign({}, state, {
          isLoading: true
        });
      case c.RECEIVE_DIRECTORY:
        return Object.assign({}, state, {
          isLoading: false,
          tiles: action.tiles
        });
      default:
        return state;
    }
  },

  Prefs(state = {locale: 'en-US'}, action = null) {
    switch (action.type) {
      case c.RECEIVE_PREFS:
        return Object.assign({}, state, {
          locale: action.prefs.get('general.useragent.locale')
        });
      default:
        return state;
    }
  },

  Search(state = {searchString: '', isLoading: false, suggestions: []}, action = null) {
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
  }

};
