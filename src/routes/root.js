"use strict";

import './root.sass';

import App from '../components/App';
import NotFound from './NotFound';
import Main from './Main';
import { login } from './Login';
import { transactions } from './Transaction';
import { transactionsAdd } from './TransactionAdd';
import RestrictPage from '../components/page/RestrictPage';

export default function createRoutes(store, pathname) {
  const restrict = {
    component: RestrictPage,
    childRoutes: [
      transactionsAdd(store),
      transactions(store),
    ]
  };

  const root = {
    path: '/',
    component: App,
    childRoutes: [
      login(store),
      restrict,
      NotFound
    ],

    indexRoute: {
      component: Main
    }
  };
  return root;

}
