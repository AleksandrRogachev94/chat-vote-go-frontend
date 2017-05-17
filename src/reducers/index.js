import { combineReducers } from 'redux'
import auth from './auth'
import flashMessages from './flashMessages'
import profilesByUserId from './profilesByUserId'

const rootReducer = combineReducers({
  auth,
  profilesByUserId,
  flashMessages
})

export default rootReducer
