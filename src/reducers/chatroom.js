import { FETCH_CHATROOM_REQUEST, FETCH_CHATROOM_SUCCESS, FETCH_CHATROOM_FAILURE, DELETE_CHATROOM_REQUEST,
  DELETE_CHATROOM_FAILURE, ADD_CHATROOM_SUCCESS, ADD_MESSAGE_SUCCESS,
  ADD_SUGGESTION_SUCCESS, REMOVE_SUGGESTION_SUCCESS, REMOVE_USER_FROM_CHATROOM_SUCCESS, CLEAR_NEW_MESSAGES_COUNT,
  CLEAR_NEW_SUGGESTIONS_COUNT, ADD_USER_TO_CHATROOM_SUCCESS } from '../actions/actionTypes'

const parseResponseChatroom = (response) => {
  let result = {
    id: response.id,
    title: response.title
  } // Basic info for list.
  if(response.owner) result.ownerId = response.owner.id
  if(response.guests) result.guestsIds = response.guests.map(guest => guest.id)
  if(response.messages) result.messagesIds = response.messages.map(message => message.id)
  if(response.suggestions) result.suggestionsIds = response.suggestions.map(sug => sug.id)

  return result
}

const chatroom = (state = {
  isFetching: false,
  errors: {},
  chatroom: {},
  newMessagesCount: 0,
  newSuggestionsCount: 0
}, action) => {

  switch(action.type) {

    case FETCH_CHATROOM_REQUEST:
    case DELETE_CHATROOM_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        errors: {}
      })

    case ADD_CHATROOM_SUCCESS:
    case FETCH_CHATROOM_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        chatroom: Object.assign({}, state.chatroom, parseResponseChatroom(action.chatroom)),
        errors: {}
      })

    case FETCH_CHATROOM_FAILURE:
    case DELETE_CHATROOM_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errors: action.errors
      })

    case ADD_MESSAGE_SUCCESS:
      if(action.message.chatroom_id !== state.chatroom.id) return state
      return Object.assign({}, state, {
        newMessagesCount: state.newMessagesCount + 1,
        chatroom: Object.assign({}, state.chatroom, {
          messagesIds: [...state.chatroom.messagesIds, action.message.id]
        })
      })

    case ADD_SUGGESTION_SUCCESS:
      if(action.suggestion.chatroom_id !== state.chatroom.id) return
      if(state.chatroom.suggestionsIds.includes(action.suggestion.id)) // Voting
        return Object.assign({}, state, { newSuggestionsCount: state.newSuggestionsCount + 1 })

      return Object.assign({}, state, {
        newSuggestionsCount: state.newSuggestionsCount + 1,
        chatroom: Object.assign({}, state.chatroom, {
          suggestionsIds: [...state.chatroom.suggestionsIds, action.suggestion.id]
        })
      })

    case REMOVE_SUGGESTION_SUCCESS:
      if(action.suggestion.chatroom_id !== state.chatroom.id) return state
      return Object.assign({}, state, {
        chatroom: Object.assign({}, state.chatroom, {
          suggestionsIds: state.chatroom.suggestionsIds.filter(id => id !== action.suggestion.id)
        })
      })

    case ADD_USER_TO_CHATROOM_SUCCESS:
      if(action.chatroom.id !== state.chatroom.id ||
        state.chatroom.guestsIds.includes(action.user.id))
        return state
      return Object.assign({}, state, {
        chatroom: Object.assign({}, state.chatroom, {
          guestsIds: [...state.chatroom.guestsIds, action.user.id]
        })
      })

    case REMOVE_USER_FROM_CHATROOM_SUCCESS:
      if(action.chatroom.id !== state.chatroom.id) return state
      return Object.assign({}, state, {
        chatroom: Object.assign({}, state.chatroom, {
          guestsIds: state.chatroom.guestsIds.filter(id => id !== action.user.id)
        })
      })

    case CLEAR_NEW_MESSAGES_COUNT:
      if(parseInt(action.chatroom_id, 10) !== state.chatroom.id) return state
      return Object.assign({}, state, {
        newMessagesCount: 0
      })

    case CLEAR_NEW_SUGGESTIONS_COUNT:
      if(parseInt(action.chatroom_id, 10) !== state.chatroom.id) return state
      return Object.assign({}, state, {
        newSuggestionsCount: 0
      })

    default:
      return state
  }
}

export default chatroom

// Selectors

export const getChatroom = (state) => (
  state.chatroom
)

export const getChatroomOwnerId = (state) => (
  state.chatroom.ownerId
)

export const getIsFetchingChatroom = (state) => (
  state.isFetching
)

export const getChatroomErrors = (state) => (
  state.errors
)

export const getNewMessagesCount = (state) => (
  state.newMessagesCount
)

export const getNewSuggestionsCount = (state) => (
  state.newSuggestionsCount
)
