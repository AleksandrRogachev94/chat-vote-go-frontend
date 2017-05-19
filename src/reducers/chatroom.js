import { FETCH_CHATROOM_REQUEST, FETCH_CHATROOM_SUCCESS, FETCH_CHATROOM_FAILURE, ADD_MESSAGE_SUCCESS } from '../actions/actionTypes'

const parseResponseChatroom = (response) => {
  let result = {
    id: response.id,
    title: response.title
  } // Basic info for list.
  if(response.owner) result.ownerId = response.owner.id
  if(response.guests) result.guestsIds = response.guests.map(guest => guest.id)
  if(response.messages) result.messagesIds = response.messages.map(message => message.id)

  return result
}

const chatroom = (state = {
  isFetching: false,
  errors: {},
  chatroom: {}
}, action) => {

  switch(action.type) {

    case FETCH_CHATROOM_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        errors: {}
      })

    case FETCH_CHATROOM_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        chatroom: parseResponseChatroom(action.chatroom),
        errors: {}
      })

    case FETCH_CHATROOM_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errors: action.errors
      })

    case ADD_MESSAGE_SUCCESS:
      if(action.message.chatroom_id !== state.chatroom.id) return state
      return Object.assign({}, state, {
        chatroom: Object.assign({}, state.chatroom, {
          messagesIds: [...state.chatroom.messagesIds, action.message.id]
        })
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

export const getIsFetchingChatroom = (state) => (
  state.isFetching
)

export const getChatroomErrors = (state) => (
  state.errors
)
