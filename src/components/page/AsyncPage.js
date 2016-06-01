'use strict';
import React, { PropTypes } from 'react';

import BasePage from './BasePage';
import Loader from '../Loader';
import ErrorPage from '../ErrorPage';

export default class AsyncPage extends BasePage {
  static propTypes = {};

  static defaultProps = {};

  wrapper() {
    let { isLoading } = this.props;
    let loader = <Loader/>;
    let body = '';

    if (isLoading === false) {
      loader = '';

      try {
        body = this.body();
      } catch (err) {
        console.error(err);
        return (<ErrorPage error={err}/>);
      }
    }

    return (
      <div className='page-wrapper'>
        <div className="page-container">
          {loader}
          {body}
        </div>
      </div>
    );
  }
}
