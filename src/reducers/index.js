import { combineReducers } from 'redux'
import auth from './auth'
import flashMessages from './flashMessages'
import profiles from './profiles'

const rootReducer = combineReducers({
  auth,
  profiles,
  flashMessages
})

export default rootReducer
