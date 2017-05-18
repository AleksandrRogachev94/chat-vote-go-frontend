import { combineReducers } from 'redux'
import auth, * as fromAuth from './auth'
import users, * as fromUsers from './users'
import flashMessages from './flashMessages'
import profilesByUserId, * as fromProfilesByUserId from './profilesByUserId'

const rootReducer = combineReducers({
  auth,
  profilesByUserId,
  users,
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

export const getUsersByTitle = (state, title) => (
  fromUsers.getUsersByTitle(state.users, title)
)
export const getIsFetchingUsers = (state, title) => (
  fromUsers.getIsFetchingUsers(state.users, title)
)
export const getUsersErrors = (state, title) => (
  fromUsers.getUsersErrors(state.users, title)
)
