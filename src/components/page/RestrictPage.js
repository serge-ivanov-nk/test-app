import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AsyncPage from './AsyncPage';

@connect(({auth}) => ({ user: auth.user }))
export default class RestrictPage extends AsyncPage {

  static propTypes = {
    user: PropTypes.string,
    children: PropTypes.object,
    location: PropTypes.object
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentWillMount() {
    const { user } = this.props;
    const { router } = this.context;

    if (!user) {
      const path = this.props.location.pathname;
      router.push(`/login/?redirect=${path}`);
    }
  }

  render() {
    const { user } = this.props;
    if (user) {
      return this.props.children;
    }

    return null;
  }
}
