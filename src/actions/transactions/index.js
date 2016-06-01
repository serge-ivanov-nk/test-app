"use strict";

import { transactionList, transactionRemove as transactionRemoveApi, transactionAdd as transactionAddApi } from '../../api/transactions';
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
} from './constants';

function transactionsRequest() {
  return {
    type: TRANSACTION_LIST_REQUEST
  };
}

function transactionsSuccess(data) {
  return {
    type: TRANSACTION_LIST_SUCCESS,
    data
  };
}

function transactionsFailure(error) {
  return {
    type: TRANSACTION_LIST_FAILURE,
    error
  };
}

export function transactions() {
  return dispatch => {
    dispatch(transactionsRequest());
    transactionList()
      .then((json) => dispatch(transactionsSuccess(json)))
      .catch((error) => dispatch(transactionsFailure(error)));
  };
}

export function transactionRemoveRequest() {
  return {
    type: TRANSACTION_REMOVE_REQUEST
  };
}

export function transactionRemoveFailure(error) {
  return {
    type: TRANSACTION_REMOVE_FAILURE,
    error
  };
}

export function transactionRemoveSuccess() {
  return {
    type: TRANSACTION_REMOVE_SUCCESS
  };
}

export function transactionRemove(id) {
  return dispatch => {
    dispatch(transactionRemoveRequest());
    transactionRemoveApi(id)
      .then((json) => dispatch(transactionRemoveSuccess(json)))
      .then(() => dispatch(transactions()))
      .catch((error) => dispatch(transactionRemoveFailure(error)));
  };
}

export function transactionAddRequest() {
  return {
    type: TRANSACTION_ADD_REQUEST
  };
}

export function transactionAddFailure(error) {
  return {
    type: TRANSACTION_ADD_FAILURE,
    error
  };
}

export function transactionAddSuccess() {
  return {
    type: TRANSACTION_ADD_SUCCESS
  };
}

export function transactionAdd(transaction) {
  return dispatch => {
    dispatch(transactionAddRequest());
    transactionAddApi(transaction)
      .then(() => dispatch(transactionAddSuccess()))
      .catch((error) => dispatch(transactionAddFailure(error)));
  };
}
