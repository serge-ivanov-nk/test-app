import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './header.sass'

export default class Header extends Component {

  static propTypes = {
    user: PropTypes.string,
    handleLogout: PropTypes.func.isRequired,
    location: React.PropTypes.object
  };

  onLogoutClick(event) {
    event.preventDefault();
    this.props.handleLogout();
  }

  render () {
    const { user } = this.props;
    const pathname = this.props.location.pathname;
    const isLoginPage = pathname.indexOf('login') > -1;
    const logoutBtb = () => <div className="nav-right" ><a href="#" onClick={ event => this.onLogoutClick(event)}>Log out</a></div>;

    return (
      <div className='nav'>
        <div className="nav-left">
          <ul>
            <li>
              <Link to="/"
                    className='link'>
                Home
              </Link>
            </li>
            <li>
              <Link to="/transactions/"
                    className='link'>
                Transaction List
              </Link>
            </li>
            <li>
              <Link to="/transactions/add"
                    className='link'>
                Transaction Add
              </Link>
            </li>
          </ul>
        </div>
        { !isLoginPage && logoutBtb() }
      </div>
    );
  }
}
