'use strict';
import React, { PropTypes } from 'react';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import BasePage from '../../components/page/BasePage';

@connect((state) => {
  const { auth } = state;
  if (auth) return {user: auth.user, loginError: auth.loginError};
  else return {user: null};
})
export default class extends BasePage {

  static propTypes = {
    user: PropTypes.string,
    loginError: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      // logged in, let's show redirect if any, or show home
      try {
        const redirect = this.props.location.query.redirect;
        this.context.router.replace(redirect);
      } catch (err) {
        this.context.router.replace('/');
      }
    }
  }


  handleLogin = (event) => {
    event.preventDefault();
    const username = this.refs.username;
    const password = this.refs.password;
    this.props.dispatch(login(username.value, password.value));
    username.value = '';
    password.value = '';
  };

  body() {
    const { user, loginError } = this.props;
    return (
      <div className="container">
        <h3>Please Log in</h3>
        <form>
          <div>
            <input type="text" ref="username" placeholder="Username (hint: admin)"/>
          </div>

          <div>
            <input type="password" ref="password" placeholder="Password (hint: password)"/>
          </div>

          {
            !user && loginError &&
            <div className="alert">
              {loginError.message}.
              <br/> Hint: use admin/password to log in.
            </div>
          }

          <button onClick={this.handleLogin}>Log in</button>
        </form>
      </div>
    );
  }
}
