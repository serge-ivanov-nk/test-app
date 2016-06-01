'use strict';

import http from './../../utils/HttpClient';
import { API_PREFIX } from '../constants';

/**
 * @description User login
 *
 * @param user - имя
 * @param password - пароль
 * @return {Promise.<Object>}
 */
export function login(user, password) {
  return http.post(`${API_PREFIX}/login/`, { user, password });
}

export function logout(user) {
  return http.post(`${API_PREFIX}/logout/`, { user });
}
