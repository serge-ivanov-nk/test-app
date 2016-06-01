'use strict';

import http from './../../utils/HttpClient';
import { API_PREFIX } from '../constants';

export function transactionRemove(id) {
  return http.delete(`${API_PREFIX}/transactions/${id}`);
}
