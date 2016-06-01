'use strict';

import http from './../../utils/HttpClient';
import { API_PREFIX } from '../constants';

export function transactionAdd(data) {
  return http.post(`${API_PREFIX}/transactions/`, data);
}
