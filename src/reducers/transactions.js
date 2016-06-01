'use strict';

import update from 'react/lib/update';
import {
  TRANSACTION_LIST_REQUEST,
  TRANSACTION_LIST_SUCCESS,
  TRANSACTION_LIST_FAILURE,
  TRANSACTION_REMOVE_REQUEST,
  TRANSACTION_REMOVE_SUCCESS,
  TRANSACTION_REMOVE_FAILURE,
  TRANSACTION_ADD_REQUEST,
  TRANSACTION_ADD_SUCCESS,
  TRANSACTION_ADD_FAILURE
} from '../actions/transactions/constants';

const init = {
  lastFetched: null,
  isLoading: false,
  error: null,
  data: { transactions: [], banks: [] }
};

export default function (state = init, action) {
  switch (action.type) {
    case TRANSACTION_ADD_REQUEST:
    case TRANSACTION_LIST_REQUEST:
    case TRANSACTION_REMOVE_REQUEST:
      return update(state, {
        isLoading: { $set: true },
        error: { $set: null }
      });
    case TRANSACTION_LIST_SUCCESS:
      {
        return update(state, {
          data: { $set: action.data },
          lastFetched: { $set: action.lastFetched },
          isLoading: { $set: false }
        });
      }
    case TRANSACTION_ADD_FAILURE:
    case TRANSACTION_LIST_FAILURE:
    case TRANSACTION_REMOVE_FAILURE:
      return update(state, { error: { $set: action.error } });
    case TRANSACTION_ADD_SUCCESS:
    case TRANSACTION_REMOVE_SUCCESS:
    default:
      return state;
  }
};

