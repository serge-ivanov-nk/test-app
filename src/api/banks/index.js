'use strict';

import http from './../../utils/HttpClient';
import { API_PREFIX } from '../constants';

export function banksList() {
  return http.get(`${API_PREFIX}/banks/`);
}
