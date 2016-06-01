'use strict';

export const ResponseById  = (list, id) => {
  const find = list.find(el => el.id == id);

  if (!find) {
    let error = new Error();
    error.code = 404;
    error.message = 'resource.not.found';
    return Promise.reject(error);
  }

  return Promise.resolve(find);
};

export const ResponseList  = (list) => Promise.resolve(list);

