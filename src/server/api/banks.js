"use strict";

import { banks } from './fakeData';
import { route, methods } from './../utils/request';
import { ResponseById, ResponseList } from './../utils/response';

export const {
  bankList,
  bankOne,
  } = {
  @route('/')
  bankList() {
    return ResponseList(banks)
  },

  @route('/:id/')
  bankOne({ id }) {
    return ResponseById(banks, id);
  }
};
