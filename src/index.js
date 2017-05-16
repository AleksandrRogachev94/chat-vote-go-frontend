import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import configureStore from './configureStore'
import jwtDecode from 'jwt-decode'
import { setCurrentUser } from './actions/authActions'

import 'bulma/css/bulma.css'

const store = configureStore()

if(localStorage.getItem('jwt')) {
  store.dispatch(setCurrentUser(jwtDecode(localStorage.getItem('jwt'))))
}

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
