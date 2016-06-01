'use strict';
import React, { PropTypes } from 'react';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import AsyncPage from '../../components/page/AsyncPage';
import { transactions, transactionRemove } from '../../actions/transactions';

@provideHooks({
 fetch: ({ dispatch }) => {
   return dispatch(transactions())
 }
})
@connect(({ transactions: { isLoading, error, data = { transactions: [], banks: [] } } }) => {
  return {
    transactions: data.transactions || [],
    banks: data.banks.reduce((obj, el) => Object.assign(obj, { [el.id]: el}, {}), {}) || {},
    isLoading: isLoading,
    error: error
  }
})
export default class extends AsyncPage {

  static propTypes = {
    transactions: PropTypes.array,
    banks: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  handleRemove(transactionId) {
    this.props.dispatch(transactionRemove(transactionId));
  };

  body() {
    let { transactions, banks } = this.props;
    let row = (el) => {
      return (
        <tr>
          <td>{el.id}</td>
          <td>{el.amount}</td>
          <td>{banks[el.bankId].name}</td>
          <td>
            <button onClick={ this.handleRemove.bind(this, el.id) }>Remove</button>
          </td>
        </tr>
      )
    };
    return (
      <div>
        <h2 className="transaction-header">Transactions List</h2>
        <table>
          <thead>
            <tr>
             <th>№</th>
             <th>Amount</th>
             <th>Bank</th>
             <th>Actions</th>
            </tr>
          </thead>
         <tbody>
         { transactions.map(el => row(el)) }
         </tbody>
        </table>
      </div>
    );
  }
}
