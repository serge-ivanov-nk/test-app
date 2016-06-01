import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import Header from './Header';
import Footer from './Footer';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const meta = {
  title: 'Test App',
  titleTemplate: 'Test App'
};

@connect(({ auth }) => ({ user: auth.user }))
export default class App extends Component {

  static propTypes = {
    children: PropTypes.object
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  handleLogout() {
    const { user } = this.props;
    this.props.dispatch(logout(user));
    this.context.router.replace('/login/');
  }

  render() {
    const  { children, user } = this.props;
    return (
      <div>
        <Helmet title={meta.title} titleTemplate={meta.titleTemplate}/>
        <Header location={this.props.location} user={user} handleLogout={() => this.handleLogout()}/>
        <div>
          {children}
        </div>
        <Footer/>
      </div>
    );
  }
}
