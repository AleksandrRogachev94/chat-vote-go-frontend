import { createStore } from 'redux'
import mainReducer from './reducers'

const configureStore = () => {
  return createStore(mainReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
}

export default configureStore
