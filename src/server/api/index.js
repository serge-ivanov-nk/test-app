'use strict';
const exec = (routes) => Object.keys(routes).map(name => routes[name]());

import * as banks from './banks';
import * as transactions from './transactions';

export default function api(server, prefix) {
  server.use(`${prefix}/banks`, exec(banks));
  server.use(`${prefix}/transactions`, exec(transactions));
}
