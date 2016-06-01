import React, { PropTypes } from 'react';

const ErrorPage = ({ error }) => {
  return (
    <div>
      <h1>Ооопс у нас ошибка!</h1>
      {error.message}
    </div>
  );
};
export default ErrorPage;
