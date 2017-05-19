import { FETCH_CHATROOM_REQUEST, FETCH_CHATROOM_SUCCESS, FETCH_CHATROOM_FAILURE } from '../actions/actionTypes'

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

    default:
      return state
  }
}

export default chatroom

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
