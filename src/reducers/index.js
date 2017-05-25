import { combineReducers } from 'redux'
import auth, * as fromAuth from './auth'
import users, * as fromUsers from './users'
import chatrooms, * as fromChatrooms from './chatrooms'
import messages, * as fromMessages from './messages'
import suggestions, * as fromSuggestions from './suggestions'
import flashMessages from './flashMessages'

const rootReducer = combineReducers({
  auth,
  users,
  chatrooms,
  messages,
  suggestions,
  flashMessages
})

export default rootReducer

//-----------------------------------
// Selectors

// Auth

export const getIsAuthenticated = (state) => (
  fromAuth.getIsAuthenticated(state.auth)
)
export const getCurrentUser = (state) => (
  fromAuth.getCurrentUser(state.auth)
)
export const getCable = (state) => (
  fromAuth.getCable(state.auth)
)
export const getSubscriptionMessages = (state) => (
  fromAuth.getSubscriptionMessages(state.auth)
)
export const getSubscriptionSuggestions = (state) => (
  fromAuth.getSubscriptionSuggestions(state.auth)
)

// Users

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

// Chatrooms

export const getChatroomsByTitle = (state, title) => (
  fromChatrooms.getChatroomsByTitle(state.chatrooms, title)
)
export const getAllChatrooms = (state) => (
  fromChatrooms.getAllChatrooms(state.chatrooms)
)
export const getIsFetchingChatrooms = (state, title) => (
  fromChatrooms.getIsFetchingChatrooms(state.chatrooms, title)
)
export const getChatroomsErrors = (state, title) => (
  fromChatrooms.getChatroomsErrors(state.chatrooms, title)
)

export const getChatroom = (state, id) => (
  fromChatrooms.getChatroom(state.chatrooms, id)
)
export const getIsFetchingChatroom = (state, id) => (
  fromChatrooms.getIsFetchingChatroom(state.chatrooms, id)
)
export const getChatroomErrors = (state, id) => (
  fromChatrooms.getChatroomErrors(state.chatrooms, id)
)

export const getMessage = (state, id) => (
  fromMessages.getMessage(state.messages, id)
)
export const getMessageWithOwner = (state, id) => {
  let result
  if(getMessage(state, id)) result = Object.assign({}, getMessage(state, id))
  if(result) {
    result.owner = getUser(state, result.user_id)
    delete result.user_id
    return result
  }
}

export const getChatroomMessages = (state, id) => {
  let ids
  if(getChatroom(state, id)) ids = getChatroom(state, id).messagesIds
  if(ids) {
    return ids.map(id => getMessageWithOwner(state, id))
  }
}
export const getChatroomOwner = (state, id) => (
  getChatroom(state, id).ownerId ? getUser(state, getChatroom(state, id).ownerId) : null
)
export const getChatroomGuests = (state, id) => (
  getChatroom(state, id).guestsIds ?
    getChatroom(state, id).guestsIds.map(id => getUser(state, id)) : null
)
export const getFullChatroom = (state, id) => {
  let result = Object.assign({}, getChatroom(state, id))
  if(result) {
    if(getChatroomMessages(state, id)) result.messages = getChatroomMessages(state, id)
    if(getChatroomOwner(state, id)) result.owner = getChatroomOwner(state, id)
    if(getChatroomGuests(state, id)) result.guests = getChatroomGuests(state, id)
    // if(result.ownerId) result.owner = getUser(state, result.ownerId)
    // if(result.guestsIds) result.guests = result.guestsIds.map(id => getUser(state, id))
    delete result.messagesIds
    delete result.ownerId
    delete result.guestsIds
    return result
  }
}

export const getSuggestion = (state, id) => (
  fromSuggestions.getSuggestion(state.suggestions, id)
)
export const getSuggestionWithOwnerAndVoters = (state, id) => {
  let result
  if(getSuggestion(state, id)) result = Object.assign({}, getSuggestion(state, id))
  if(result) {
    result.owner = getUser(state, result.user_id)
    delete result.user_id
    result.voters = result.voters.map(id => getUser(state, id))
    return result
  }
}
export const getSuggestionsFromChatroom = (state, id) => {
  let ids
  if(getChatroom(state, id)) ids = getChatroom(state, id).suggestionsIds
  if(ids) {
    return ids.map(id => getSuggestionWithOwnerAndVoters(state, id))
  }
}
