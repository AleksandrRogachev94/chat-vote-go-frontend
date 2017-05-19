import { combineReducers } from 'redux'
import auth, * as fromAuth from './auth'
import users, * as fromUsers from './users'
import chatrooms, * as fromChatrooms from './chatrooms'
import messages, * as fromMessages from './messages'
import flashMessages from './flashMessages'

const rootReducer = combineReducers({
  auth,
  users,
  chatrooms,
  messages,
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
  fromUsers.getProfile(state.users, id)
)
export const getIsFetchingProfile = (state, id) => (
  fromUsers.getIsFetchingProfile(state.users, id)
)
export const getDidInvalidateProfile = (state, id) => (
  fromUsers.getDidInvalidateProfile(state.users, id)
)
export const getProfileErrors = (state, id) => (
  fromUsers.getProfileErrors(state.users, id)
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

export const getChatroomsByTitle = (state, title) => (
  fromChatrooms.getChatroomsByTitle(state.chatrooms, title)
)
export const getIsFetchingChatrooms = (state, title) => (
  fromChatrooms.getIsFetchingChatrooms(state.chatrooms, title)
)
export const getChatroomsErrors = (state, title) => (
  fromChatrooms.getChatroomsErrors(state.chatrooms, title)
)

export const getMessage = (state, id) => (
  fromMessages.getMessage(state.messages,id)
)
