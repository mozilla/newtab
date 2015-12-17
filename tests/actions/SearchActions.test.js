const assert = require('chai').assert;
const c = require('lib/constants');
const configureMockStore = require('redux-mock-store');
const SearchActions = require('actions/SearchActions');

const {currentEngine, engines} = require('lib/platform-placeholder').FAKE_ENGINES;
const mockStore = configureMockStore([require('redux-thunk')]);

describe('SearchActions', () => {
  describe('#getSuggestions', () => {
    it('should dispatch the right actions', done => {
      const suggestions = ['hello is cool', 'hello sucks', 'hello is ok'];
      const expectedActions = [
        {type: c.REQUEST_SEARCH_SUGGESTIONS},
        {type: c.RECEIVE_SEARCH_SUGGESTIONS, suggestions},
      ];
      const store = mockStore({search: {}), expectedActions, done);
      store.dispatch(SearchActions.getSuggestions({engineName: 'Google', searchString: 'hello'}));
    });
  });
  describe('#getSearchEngines', () => {
    it('should dispatch the right actions', done => {
      const expectedActions = [
        {type: c.REQUEST_SEARCH_ENGINES, },
        {type: c.RECEIVE_SEARCH_ENGINES, currentEngine, engines},
      ];
      const store = mockStore({search: {}}, expectedActions, done);
      store.dispatch(SearchActions.getSearchEngines());
    });
  });
  describe('#updateSearchString', () => {
    it('should create an UPDATE_SEARCH_STRING action', () => {
      assert.deepEqual(SearchActions.updateSearchString('hello'), {
        type: c.UPDATE_SEARCH_STRING,
        searchString: 'hello'
      });
    });
  });
});
