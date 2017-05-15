import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import mainReducer from './reducers'

const configureStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(mainReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(logger)
  ));
}

export default configureStore
