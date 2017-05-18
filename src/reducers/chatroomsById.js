import { FETCH_CHATROOMS_SUCCESS } from '../actions/actionTypes'

const chatroomsById = (state = {}, action) => {
  switch(action.type) {
    case FETCH_CHATROOMS_SUCCESS:
      const nextState = Object.assign({}, state)
      action.chatrooms.forEach(chatroom => { nextState[chatroom.id] = chatroom })
      return nextState

    default:
      return state
  }
}

export default chatroomsById

// Selectors

export const getChatroom = (state, id) => chatroom[id]
