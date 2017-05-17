import { combineReducers } from 'redux'
import auth from './auth'
import flashMessages from './flashMessages'
import profilesByUserId, * as fromProfilesByUserId from './profilesByUserId'

const rootReducer = combineReducers({
  auth,
  profilesByUserId,
  flashMessages
})

export default rootReducer

// Selectors

export const getProfileByUserId = (state, id) => (
  fromProfilesByUserId.getProfileByUserId(state.profilesByUserId, id)
)
