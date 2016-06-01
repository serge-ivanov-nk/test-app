'use strict';

export function transactionsAdd(store) {
  return {
    path: '/transactions/add',

    getComponents(location, cb) {
      cb(null, require('./page').default);
    }
  };
}
