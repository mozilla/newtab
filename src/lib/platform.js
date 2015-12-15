const {FAKE_PREFS, FAKE_FRECENT, FAKE_ENGINES, EventEmitter} = require('lib/platform-placeholder');

class Prefs extends EventEmitter {
  getCurrent() {
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
  getCurrentEngines() {
    return new Promise(resolve => resolve({
      currentEngine: FAKE_ENGINES.currentEngine,
      engines: FAKE_ENGINES.engines
    }));
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
  performSearch(engine, searchString) {
    window.location = `https://www.google.ca/search?q=${encodeURI(searchString)}`;
  }
}

const WebPlaform = {
  prefs: new Prefs(),
  sites: new Sites(),
  search: new Search()
};

module.exports = navigator.mozNewTab || WebPlaform;
