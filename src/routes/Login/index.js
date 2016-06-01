'use strict';

export function login(store) {
  return {
    path: '/login/',

    getComponents(location, cb) {
      cb(null, require('./page').default);
    }
  };
}
