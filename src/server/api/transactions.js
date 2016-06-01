"use strict";

import { transactions } from './fakeData';
import { route, methods, DELETE, POST } from './../utils/request';
import { ResponseById, ResponseList } from './../utils/response';

let lastId = transactions.length+1;

export const {
  transactionList,
  transactionOne,
  transactionRemove,
  transactionAdd
  } = {
  @route('/')
  transactionList() {
    return ResponseList(transactions)
  },

  @route('/:id/')
  transactionOne({ id }) {
    return ResponseById(transactions, id);
  },

  @route('/:id/')
  @methods(DELETE)
  transactionRemove({ id }) {
    let idx = transactions.findIndex((t) => t.id == id);
    if (~idx) transactions.splice(idx, 1);
    return ResponseList(transactions)
  },

  @route('/')
  @methods(POST)
  transactionAdd({ amount, bankId }) {
    var transaction = { id: lastId, amount, bankId };
    transactions.push(transaction);
    lastId++;
    return transaction;
  }
};
