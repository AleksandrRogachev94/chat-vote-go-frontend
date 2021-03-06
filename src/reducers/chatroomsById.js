import { FETCH_CHATROOM_REQUEST, FETCH_CHATROOM_SUCCESS, FETCH_CHATROOM_FAILURE, DELETE_CHATROOM_REQUEST,
  DELETE_CHATROOM_SUCCESS, DELETE_CHATROOM_FAILURE, FETCH_CHATROOMS_SUCCESS, ADD_MESSAGE_SUCCESS,
  ADD_CHATROOM_SUCCESS, ADD_SUGGESTION_SUCCESS, REMOVE_SUGGESTION_SUCCESS, REMOVE_USER_FROM_CHATROOM_SUCCESS,
  ADD_USER_TO_CHATROOM_SUCCESS, CLEAR_NEW_MESSAGES_COUNT, CLEAR_NEW_SUGGESTIONS_COUNT } from '../actions/actionTypes'
import { fetchChatroomSuccess } from '../actions/chatroomActions'
import chatroom, * as fromChatroom from './chatroom'

const chatroomsById = (state = {}, action) => {
  switch(action.type) {
    case FETCH_CHATROOMS_SUCCESS:
      const nextState = Object.assign({}, state)
      action.chatrooms.forEach(chatroomObj => {
        nextState[chatroomObj.id] = chatroom(state[chatroomObj.id], fetchChatroomSuccess(chatroomObj))
      })
      return nextState

    case FETCH_CHATROOM_REQUEST:
    case FETCH_CHATROOM_FAILURE:
    case DELETE_CHATROOM_REQUEST:
    case DELETE_CHATROOM_FAILURE:
      return Object.assign({}, state, {
        [action.id]: chatroom(state[action.id], action)
      })

    case FETCH_CHATROOM_SUCCESS:
    case ADD_CHATROOM_SUCCESS:
      return Object.assign({}, state, {
        [action.chatroom.id]: chatroom(state[action.chatroom.id], action)
      })

    case DELETE_CHATROOM_SUCCESS:
      let newState = Object.assign({}, state)
      delete newState[action.chatroom.id]
      return newState

    case ADD_MESSAGE_SUCCESS:
      return Object.assign({}, state, {
        [action.message.chatroom_id]: chatroom(state[action.message.chatroom_id], action)
      })

    case ADD_SUGGESTION_SUCCESS:
      return Object.assign({}, state, {
        [action.suggestion.chatroom_id]: chatroom(state[action.suggestion.chatroom_id], action)
      })

    case REMOVE_SUGGESTION_SUCCESS:
      return Object.assign({}, state, {
        [action.suggestion.chatroom_id]: chatroom(state[action.suggestion.chatroom_id], action)
      })

    case ADD_USER_TO_CHATROOM_SUCCESS:
      return Object.assign({}, state, {
        [action.chatroom.id]: chatroom(state[action.chatroom.id], action)
      })

    case REMOVE_USER_FROM_CHATROOM_SUCCESS:
      return Object.assign({}, state, {
        [action.chatroom.id]: chatroom(state[action.chatroom.id], action)
      })

    case CLEAR_NEW_MESSAGES_COUNT:
    case CLEAR_NEW_SUGGESTIONS_COUNT:
      return Object.assign({}, state, {
        [action.chatroom_id]: chatroom(state[action.chatroom_id], action)
      })

    default:
      return state
  }
}

export default chatroomsById

// Selectors

export const getChatroom = (state, id) => (
  state[id] && fromChatroom.getChatroom(state[id])
)

export const getIsFetchingChatroom = (state, id) => (
  state[id] && fromChatroom.getIsFetchingChatroom(state[id])
)

export const getChatroomErrors = (state, id) => (
  state[id] && fromChatroom.getChatroomErrors(state[id])
)

export const getNewMessagesCount = (state, id) => (
  state[id] && fromChatroom.getNewMessagesCount(state[id])
)

export const getNewSuggestionsCount = (state, id) => (
  state[id] && fromChatroom.getNewSuggestionsCount(state[id])
)
