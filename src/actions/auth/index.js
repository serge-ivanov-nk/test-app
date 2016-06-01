import 'isomorphic-fetch';
import { ID_TOKEN,
  checkStatus,
  parseJSON,
  setIdToken,
  removeIdToken,
  decodeUserProfile } from '../../utils/auth';

import { login as loginApi, logout as logoutApi } from '../../api/auth';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function loginRequest(user) {
  return {
    type: LOGIN_REQUEST,
    user,
  };
}

function loginSuccess(idToken) {
  setIdToken(idToken);
  const profile = decodeUserProfile(idToken);
  return {
    type: LOGIN_SUCCESS,
    user: profile.user,
    role: profile.role,
  };
}

function loginFailure(user, error) {
  removeIdToken();
  return {
    type: LOGIN_FAILURE,
    user,
    error,
  };
}

export function login(user, password) {
  return dispatch => {
    dispatch(loginRequest(user));
    loginApi(user, password)
      .then((json) => {
        const idToken = json[ID_TOKEN];
        dispatch(loginSuccess(idToken));
      }).catch((error) => {
        dispatch(loginFailure(user, error));
      });
  };
}

function logoutRequest(user) {
  removeIdToken();
  return {
    type: LOGOUT_REQUEST,
    user,
  };
}

function logoutSuccess(user) {
  removeIdToken();
  return {
    type: LOGOUT_SUCCESS,
    user,
  };
}

function logoutFailure(user, error) {
  return {
    type: LOGOUT_FAILURE,
    user,
    error,
  };
}

export function logout(user) {
  return dispatch => {
    dispatch(logoutRequest(user));
    return logoutApi(user)
      .then(json => dispatch(logoutSuccess(user)))
      .catch((error) => dispatch(logoutFailure(user, error)));
  };
}
