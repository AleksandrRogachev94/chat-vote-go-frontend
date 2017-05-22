import { RECEIVE_SUGGESTIONS } from '../actions/actionTypes'

const suggestions = (state = {
  suggestionsById: {}
}, action) => {
  switch(action.type){
    case RECEIVE_SUGGESTIONS:
      const nextState = Object.assign({}, state)
      action.suggestions.forEach(sug => { nextState.suggestionsById[sug.id] = sug })
      return nextState

    // case ADD_MESSAGE_SUCCESS:
    //   return Object.assign({}, state, {
    //     messagesById: Object.assign({}, state.messagesById, {
    //       [action.message.id]: action.message
    //     })
    //   })

    default:
      return state
  }
}

export default suggestions

// Selectors

export const getSuggestion = (state, id) => state.suggestionsById[id]
