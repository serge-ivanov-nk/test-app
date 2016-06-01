'use strict';
import React, { PropTypes } from 'react';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { transactionAdd } from '../../actions/transactions';
import AsyncPage from '../../components/page/AsyncPage';
import { banks } from '../../actions/banks';
import {reduxForm} from 'redux-form';

@reduxForm({
  form: 'transaction',
  fields: ['bankId', 'amount'],
  validate: values => {
    const errors = {};
    if (!values.bankId) errors.bankId = 'Bank - Required';
    if (!values.amount) errors.amount = 'amount - Required';
    return errors
  }
})
@provideHooks({
  fetch: ({ dispatch }) => {
    return dispatch(banks())
  }
})
@connect(({ banks: { isLoading, error, data } }) => {
  return {
    banks: data,
    isLoading: isLoading,
    error: error
  }
})
export default class extends AsyncPage {

  static propTypes = {
    banks: PropTypes.array,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  onSubmit = () => {
    let amount = this.refs.amount.value, bankId = this.refs.bankId.value;
    this.props.dispatch(transactionAdd({amount, bankId}));
    this.props.resetForm();
  };

  body() {
    let { fields: { bankId, amount }, banks, handleSubmit } = this.props;
    let item = (item) => <option value={item.id}>{item.name}</option>
    return (
      <div className="transaction-add">
        <h2 className="transaction-header">Add Transaction</h2>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            <label>Amount</label>
            <div>
              <input ref="amount" type="number" defaultValue="0" placeholder="Amount" {...amount}/>
            </div>
            {amount.touched && amount.error && <div className="error">{amount.error}</div>}
          </div>
          <div>
            <label>Bank</label>
            <div>
              <select ref="bankId" {...bankId} >
                <option></option>
                {banks.map(item)}
              </select>
              {bankId.touched && bankId.error && <div className="error" >{bankId.error}</div>}
            </div>
          </div>
          <button className="btn-smb" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
