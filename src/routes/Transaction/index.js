'use strict';

export function transactions(store) {
  return {
    path: '/transactions/',

    getComponents(location, cb) {
      cb(null, require('./page').default);
    }
  };
}
