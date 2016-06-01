"use strict";

import { banksList } from '../../api/banks';
import {
  BANK_LIST_REQUEST,
  BANK_LIST_SUCCESS,
  BANK_LIST_FAILURE
} from './constants';

function banksRequest() {
  return {
    type: BANK_LIST_REQUEST
  };
}

function banksSuccess(data) {
  return {
    type: BANK_LIST_SUCCESS,
    data
  };
}

function banksFailure(error) {
  return {
    type: BANK_LIST_FAILURE,
    error
  };
}

export function banks() {
  return dispatch => {
    dispatch(banksRequest());
    banksList()
      .then((json) => dispatch(banksSuccess(json)))
      .catch((error) => dispatch(banksFailure(error)));
  };
}
