'use strict';

import React, { Component } from 'react';
import Helmet from 'react-helmet';

import NotFound from '../NotFound';

export default class BasePage extends Component {
  static propTypes = {};
  static defaultProps = {};

  render() {
    let { error } = this.props;

    if (!error) {
      return this.wrapper();
    } else {
      return this.error();
    }
  }

  wrapper() {
    return (
      <div className='page-wrapper'>
        <div className="page-container">
          {this.body()}
        </div>
      </div>
    );
  }

  error() {
    return <NotFound />;
  }

  body() {
    return <div></div>;
  }
}
