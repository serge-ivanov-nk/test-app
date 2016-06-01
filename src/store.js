import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createLogger from 'redux-logger';

import createReducer from "./createReducer";
import { PAGE_DATA_NAME } from "./constant";
let store;

const logger = createLogger();

export function configureStore(initialState = {}) {
  store = createStore(createReducer(), initialState, compose(
    applyMiddleware(thunk, logger),
    (process.env.NODE_ENV == 'development') &&
     typeof window === 'object' &&
      typeof window.devToolsExtension !== 'undefined' ?
       window.devToolsExtension() : f => f
  ));

  store.asyncReducers = {};

  if (process.env.NODE_ENV == 'development') {
    if (module.hot) {
      module.hot.accept('./createReducer', () =>
        store.replaceReducer(require('./createReducer').default)
      );
    }
  }

  return store;
}

export function getStore() {
  if (!store) {
    throw new Error('store - попытка получения хранилища до его создания.');
  }

  return store;
}

export function injectPageData(asyncReducer) {
  injectAsyncReducer(PAGE_DATA_NAME, asyncReducer);
}

export function inject(store, name, asyncReducer) {
  let asyncReducers = store.asyncReducers;
  
  if (!asyncReducers[name] || asyncReducers[name] !== asyncReducer) {
    asyncReducers[name] = asyncReducer;
    store.replaceReducer(createReducer(asyncReducers));
  }
}

export function injectAsyncReducer(name, asyncReducer) {
  // store.asyncReducers[name] = asyncReducer;
  // store.replaceReducer(createReducer(store.asyncReducers));
}
