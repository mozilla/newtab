const FAKE_PREFS = new Map([
  ['browser.newtabpage.rows', 3],
  ['browser.newtabpage.columns', 5],
  ['browser.newtabpage.enabled', true],
  ['browser.newtabpage.enhanced', true],
  ['browser.newtabpage.pinned', undefined],
  ['browser.newtabpage.remote', false],
  ['intl.locale.matchOS', false],
  ['general.useragent.locale', 'en-US']
]);

const WebPlaform = {
  prefs: {
    getCurrent() {
      return FAKE_PREFS;
    }
  }
};

module.exports = navigator.mozNewTab || WebPlaform;
