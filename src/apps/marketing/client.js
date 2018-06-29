import React from 'react';
import { hydrate } from 'react-dom';
import App from '.';

hydrate(
  <App/>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
