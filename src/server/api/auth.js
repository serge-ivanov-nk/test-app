"use strict";

import jwt from 'jsonwebtoken';

import { banks } from './fakeData';
import { route, methods } from './../utils/request';
import { ResponseById, ResponseList } from './../utils/response';

export const {
  login,
  logout,
  } = {
  @route('/login/')
  login() {
    return ResponseList(banks)
  },

  @route('/logout/')
  logout({ id }) {
    return ResponseById(banks, id);
  }
};
