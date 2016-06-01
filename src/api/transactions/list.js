'use strict';

import http from './../../utils/HttpClient';
import { API_PREFIX } from '../constants';
import { banksList } from '../banks';

export function transactionList() {
  return Promise.all([
      http.get(`${API_PREFIX}/transactions/`),
      banksList()
    ])
    .then(([transactions, banks]) => ({ transactions, banks }));
}
