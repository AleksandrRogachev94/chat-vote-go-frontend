import { combineReducers } from 'redux'
import auth, * as fromAuth from './auth'
import flashMessages from './flashMessages'
import profilesByUserId, * as fromProfilesByUserId from './profilesByUserId'

const rootReducer = combineReducers({
  auth,
  profilesByUserId,
  flashMessages
})

export default rootReducer

// Selectors

export const getIsAuthenticated = (state) => (
  fromAuth.getIsAuthenticated(state.auth)
)

export const getCurrentUser = (state) => (
  fromAuth.getCurrentUser(state.auth)
)

export const getProfileByUserId = (state, id) => (
  fromProfilesByUserId.getProfileByUserId(state.profilesByUserId, id)
)
