import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import configureStore from './configureStore'
import ActionCable from 'actioncable'
import jwtDecode from 'jwt-decode'
import { setCurrentUser } from './actions/authActions'

import './App.css'
import 'bulma/css/bulma.css'

const store = configureStore()

if(localStorage.getItem('jwt')) {
  const jwt = localStorage.getItem('jwt')
  const cable = ActionCable.createConsumer(`/cable?jwt=${jwt}`) // Connect to ActionCable
  const user = jwtDecode(jwt)
  store.dispatch(setCurrentUser(user, cable))
}

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
