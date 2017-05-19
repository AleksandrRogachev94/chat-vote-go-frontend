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

export const getUser = (state, id) => (
  fromUsers.getUser(state.users, id)
)
export const getIsFetchingUser = (state, id) => (
  fromUsers.getIsFetchingUser(state.users, id)
)
export const getDidInvalidateUser = (state, id) => (
  fromUsers.getDidInvalidateUser(state.users, id)
)
export const getUserErrors = (state, id) => (
  fromUsers.getUserErrors(state.users, id)
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
