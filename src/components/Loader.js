"use strict";

import React, { PropTypes } from 'react';

let stylePageLoader = {
  height: '2000px',
  textAlign: 'center'
};

const Loader = () =>
  <div style={stylePageLoader}>
    <h2 className='title'>Loading....</h2>
  </div>
;

export default Loader;
