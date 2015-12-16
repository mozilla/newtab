const {FAKE_PREFS, FAKE_FRECENT, FAKE_ENGINES, EventEmitter} = require('lib/platform-placeholder');

const api = navigator.mozNewTab || {prefs: {}, search: {}, sites: {}};

class Prefs extends EventEmitter {
  getCurrent() {
    if (api.prefs.getCurrent) return api.prefs.getCurrent();
    return FAKE_PREFS;
  }
  set(prefs) {
    Object.keys(prefs).forEach(key => FAKE_PREFS.set(key, prefs[key]));
    this.dispatch(FAKE_PREFS);
  }
}

class Sites extends EventEmitter {
  getFrecent() {
    return new Promise(resolve => resolve(FAKE_FRECENT));
  }
  getThumbnail() {
    return new Promise(resolve => resolve({
      imageURI: 'http://lorempixel.com/290/180/technics',
      imageURI_2x: 'http://lorempixel.com/580/360/technics'}));
  }
}

class Search extends EventEmitter {
  getVisibleEngines() {
    if (api.search.getVisibleEngines) return api.search.getVisibleEngines();
    return new Promise(resolve => resolve(FAKE_ENGINES.engines));
  }
  getCurrentEngine() {
    if (api.search.getCurrentEngine) return api.search.getCurrentEngine();
    return new Promise(resolve => resolve(FAKE_ENGINES.currentEngine));
  }
  getSuggestions({searchString = '', engineName = 'Yahoo'} = {}) {
    return new Promise(resolve => {
      resolve([
        searchString + ' is cool',
        searchString + ' sucks',
        searchString + ' is ok'
      ]);
    });
  }
  performSearch({engine, searchString} = {}) {
    switch (engine) {
      case 'Google':
        window.location = `https://www.google.ca/search?q=${encodeURI(searchString)}`;
        break;
      default:
        window.location = `https://ca.search.yahoo.com/search?q=${encodeURI(searchString)}`;
    }
  }
}

const WebPlatform = {
  prefs: new Prefs(),
  sites: new Sites(),
  search: new Search()
};

module.exports = navigator.mozNewTab || WebPlatform;
