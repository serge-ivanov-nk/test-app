'use strict';
import React, { PropTypes } from 'react';
import BasePage from './../../components/page/BasePage';
import { Link } from 'react-router';

export default class extends BasePage {
  static propTypes = {
    main: PropTypes.array
  };

  body() {
    return (
      <div className='main-page'>
        Index Page
        <ul>
          <li>
            <Link to="/login/"
                  className='link'>
              Login Page
            </Link>
          </li>
          <li>
            <Link to="/transactions/"
                  className='link'>
              Transaction List Page
            </Link>
          </li>
          <li>
            <Link to="/transactions/add"
                  className='link'>
              Transaction Add Page
            </Link>
          </li>
          <li>
            <Link to="/"
                  className='link'>
              Home
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
