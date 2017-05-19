import { RECEIVE_MESSAGES } from '../actions/actionTypes'

const messages = (state = {
  messagesById: {}
}, action) => {
  switch(action.type){
    case RECEIVE_MESSAGES:
      const nextState = Object.assign({}, state)
      action.messages.forEach(message => { nextState.messagesById[message.id] = message })
      return nextState
    default:
      return state
  }
}

export default messages

// Selectors

export const getMessage = (state, id) => state.messagesById[id]
