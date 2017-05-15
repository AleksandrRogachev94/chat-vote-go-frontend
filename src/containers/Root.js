import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import App from './App'
import Home from '../components/Home'
import NotFound from '../components/NotFound'

const Root = ({ store }) => (
  <Provider store={store} >
    <Router history={browserHistory}>
      <Route path='/' component={App} >
        <IndexRoute component={Home} />

        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  </Provider>
)

export default Root
