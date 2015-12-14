const {createStore, applyMiddleware, compose} = require('redux');
const thunk = require('redux-thunk').default;

module.exports = function finalCreateStore(reducer) {
  const middleware = [
    thunk
    // Add more middleware here
  ];

  const configureStoreFn = compose(
    applyMiddleware(...middleware)
  )(createStore);

  return configureStoreFn(reducer);
}
