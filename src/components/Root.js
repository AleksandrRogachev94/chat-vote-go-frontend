import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import App from './App'
import Home from './Home'
import NotFound from './NotFound'
import LoginPage from './login/LoginPage'
import SignupPage from './signup/SignupPage'
import ProfilePageContainer from './profile/ProfilePageContainer'

import requireAuth from './common/requireAuth'

const Root = ({ store }) => (
  <Provider store={store} >
    <Router history={browserHistory}>
      <Route path='/' component={App} >
        <IndexRoute component={Home} />
        <Route path='/login' component={LoginPage} />
        <Route path='/signup' component={SignupPage} />
        <Route path='/users/:id' component={requireAuth(ProfilePageContainer)} />

        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  </Provider>
)

export default Root
