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

export const getProfile = (state, id) => (
  fromProfilesByUserId.getProfile(state.profilesByUserId, id)
)
export const getIsFetchingProfile = (state, id) => (
  fromProfilesByUserId.getIsFetchingProfile(state.profilesByUserId, id)
)
export const getProfileErrors = (state, id) => (
  fromProfilesByUserId.getProfileErrors(state.profilesByUserId, id)
)
