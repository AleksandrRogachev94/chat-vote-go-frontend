import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import configureStore from './configureStore'

import 'bulma/css/bulma.css'

const store = configureStore()

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
