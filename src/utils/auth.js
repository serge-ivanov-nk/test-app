"use strict";

import jwt_decode from 'jwt-decode';

export const ID_TOKEN = 'id_token';

export function setIdToken(idToken) {
  localStorage.setItem(ID_TOKEN, idToken);
}

export function removeIdToken() {
  localStorage.removeItem(ID_TOKEN);
}

export function decodeUserProfile(idToken) {
  try {
    return jwt_decode(idToken);
  } catch (err) {
    return null;
  }
}

export function loadUserProfile() {
  try {
    const idToken = localStorage.getItem(ID_TOKEN);
    const userProfile = jwt_decode(idToken);
    const now = new Date().getTime() / 1000;

    if (now > userProfile.exp) {
      return {};
    }
    return userProfile;
  } catch (err) {
    return null;
  }
}
