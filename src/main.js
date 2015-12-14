'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const {combineReducers} = require('redux');
const {Provider} = require('react-redux');
const finalCreateStore = require('lib/finalCreateStore');
const reducers = require('reducers/index');
const App = require('components/App/App');

const reducer = combineReducers(reducers);
const store = finalCreateStore(reducer);

const Root = React.createClass({
  render: function () {
    return (<Provider store={store}>
      <App />
    </Provider>);
  }
});

ReactDOM.render(<Root />, document.getElementById('root'));
