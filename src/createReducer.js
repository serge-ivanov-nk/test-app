"use strict";

import { combineReducers } from 'redux';
import auth from './reducers/auth';
import transactions from './reducers/transactions';
import banks from './reducers/banks';
import { reducer as formReducer } from 'redux-form';

export default function createReducer(asyncReducers) {
  return combineReducers({
    auth,
    transactions,
    banks,
    form: formReducer,
    ...asyncReducers
  });
}
