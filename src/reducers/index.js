import { combineReducers } from 'redux'
import auth from './auth'
import flashMessages from './flashMessages'
import profiles from './profiles'

const rootReducer = combineReducers({
  auth,
  profilesByUserId,
  flashMessages
})

export default rootReducer
