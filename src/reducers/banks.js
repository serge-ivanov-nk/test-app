'use strict';

import update from 'react/lib/update';
import {
  BANK_LIST_REQUEST,
  BANK_LIST_SUCCESS,
  BANK_LIST_FAILURE
} from '../actions/banks/constants';

const init = {
  lastFetched: null,
  isLoading: false,
  error: null,
  data: []
};

export default function (state = init, action) {
  switch (action.type) {
    case BANK_LIST_REQUEST:
      return update(state, {
        isLoading: { $set: true },
        error: { $set: null }
      });
    case BANK_LIST_SUCCESS:
      {
        return update(state, {
          data: { $set: action.data },
          lastFetched: { $set: action.lastFetched },
          isLoading: { $set: false }
        });
      }

    case BANK_LIST_FAILURE:
      return update(state, { error: { $set: action.error } });
    default:
      return state;
  }
};

