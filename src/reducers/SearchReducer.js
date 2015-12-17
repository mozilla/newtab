const c = require('lib/constants');
const {updateState} = require('lib/utils');

const initialState = {
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
};

module.exports = function Search(prevState = initialState, action = null) {
  switch (action.type) {
    case c.UPDATE_SEARCH_STRING:
      return updateState(prevState, {
        searchString: action.searchString
      });
    case c.REQUEST_SEARCH_SUGGESTIONS:
      return updateState(prevState, {
        isLoading: true
      });
    case c.RECEIVE_SEARCH_SUGGESTIONS:
      return updateState(prevState, {
        isLoading: false,
        suggestions: action.suggestions || []
      });
    case c.REQUEST_SEARCH_ENGINES:
      return updateState(prevState, {
        isLoading: true
      });
    case c.RECEIVE_SEARCH_ENGINES:
      return updateState(prevState, {
        isLoading: false,
        currentEngine: action.currentEngine,
        engines: action.engines
      });
    default:
      return prevState;
  }
};
