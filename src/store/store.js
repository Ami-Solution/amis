import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

function configure(initialState) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(thunk),
    persistState(
      window.location.href.match(
        /[?&]debug_session=([^&]+)\b/
      )
    )
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/rootReducer', () => {
      const nextReducer = require('../reducers/rootReducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

export default configure;
