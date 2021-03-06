import { RECEIVE_SUGGESTIONS, ADD_SUGGESTION_SUCCESS, REMOVE_SUGGESTION_SUCCESS } from '../actions/actionTypes'

const suggestions = (state = {
  suggestionsById: {}
}, action) => {
  switch(action.type){
    case RECEIVE_SUGGESTIONS:
      const nextState = Object.assign({}, state)
      action.suggestions.forEach(sug => { nextState.suggestionsById[sug.id] = sug })
      return nextState

    case ADD_SUGGESTION_SUCCESS:
      return Object.assign({}, state, {
        suggestionsById: Object.assign({}, state.suggestionsById, {
          [action.suggestion.id]: action.suggestion
        })
      })

    case REMOVE_SUGGESTION_SUCCESS:
      let newState = Object.assign({}, state)
      delete newState.suggestionsById[action.suggestion.id]
      return newState

    default:
      return state
  }
}

export default suggestions

// Selectors

export const getSuggestion = (state, id) => state.suggestionsById[id]
