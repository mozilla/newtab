'use strict';

const NEW_TAB_EVENT = 'NewTabCommand';
const GET_INITIAL_STATE_EVENT = 'NewTab:GetInitialState';
const STATE_CHANGE_EVENT = 'NewTab:State';
const OBSERVE_EVENT = 'NewTab:Observe';

class Comm {

  constructor() {
    this.listeners = new Map();
  }

  // Dispatch command to browser
  dispatch(command, data='') {
    document.dispatchEvent(new CustomEvent(NEW_TAB_EVENT, {
      detail: {command, data}
    }));
  }

  // Add event listener of a particular type
  on(type, callback) {
    if (!this.listeners[type]) this.listeners[type] = new Set();
    this.listeners[type].add(callback);
    this.dispatch('NewTab:Register', {type});
  }

  // Removes callback if provided,
  // else removes all listeners of a type
  off(type, callback) {
    if (callback) {
      this.listeners[type].delete(callback);
    } else {
      this.listeners.delete(key);
    }
  }

  _baseListener(message) {
    console.log(this);
    this.listeners[message.data.name].forEach(callback => callback(message.data.data));
  }

  init(callback) {
    // cache a reference so we can remove the listener
    this._boundBaseListener = this._baseListener.bind(this);

    window.addEventListener('message', this._boundBaseListener);
    document.addEventListener('NewTabCommandReady', () => {
      this.on(STATE_CHANGE_EVENT, callback);
      this.dispatch(GET_INITIAL_STATE_EVENT);
    });
  }

  destroy() {
    if (this._boundBaseListener) window.removeEventListener('message', this._boundBaseListener);
  }

}

module.exports = new Comm();
