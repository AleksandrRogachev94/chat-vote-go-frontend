import { RECEIVE_MESSAGES, ADD_MESSAGE_SUCCESS } from '../actions/actionTypes'

const messages = (state = {
  messagesById: {}
}, action) => {
  switch(action.type){
    case RECEIVE_MESSAGES:
      const nextState = Object.assign({}, state)
      action.messages.forEach(message => { nextState.messagesById[message.id] = message })
      return nextState

    case ADD_MESSAGE_SUCCESS:
      return Object.assign({}, state, {
        messagesById: Object.assign({}, state.messagesById, {
          [action.message.id]: action.message
        })
      })

    default:
      return state
  }
}

export default messages

// Selectors

export const getMessage = (state, id) => state.messagesById[id]
