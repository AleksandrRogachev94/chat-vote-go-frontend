import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

const configureStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(logger, thunkMiddleware)
  ));
}

export default configureStore
