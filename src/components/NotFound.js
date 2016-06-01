import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

const NotFound = () => {
  return (
    <div>
      <Helmet title='Not Found' />
      <h1>Page Not Found!</h1>
    </div>
  );
};

export default NotFound;
