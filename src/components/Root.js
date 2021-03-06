import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import HttpsRedirect from 'react-https-redirect';

import App from './App'
import Home from './Home'
import NotFound from './NotFound'
import LoginPage from './login/LoginPage'
import SignupPage from './signup/SignupPage'
import UsersPage from './users/UsersPage'
import ChatroomsPage from './chatrooms/ChatroomsPage'

import requireAuth from './common/requireAuth'

const Root = ({ store }) => (
  <Provider store={store} >
    <HttpsRedirect>
      <Router history={browserHistory}>
        <Route path='/' component={App} >
          <IndexRoute component={Home} />
          <Route path='/login' component={LoginPage} />
          <Route path='/signup' component={SignupPage} />
          <Route path='/users(/:id)' component={requireAuth(UsersPage)} />
          <Route path='/chatrooms(/:id)' component={requireAuth(ChatroomsPage)} />

          <Route path='*' component={NotFound} />
        </Route>
      </Router>
    </HttpsRedirect>
  </Provider>
)

export default Root
