import React from 'react';
import ReactDOM from 'react-dom';

import AllUserWrapper from './components/AllUserWrapper.js';

const title = 'My Minimal React Webpackdasdsf Babel Setup';

ReactDOM.render(
  <div>
  <AllUserWrapper />
  </div>,
  document.getElementById('app')
);

module.hot.accept();