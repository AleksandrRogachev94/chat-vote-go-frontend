import 'isomorphic-fetch'
import { fetchWrapper, dataFromReject } from '../lib/shared'
import { addFlashMessage } from './flashMessages'
import { RECEIVE_SUGGESTIONS, ADD_SUGGESTION_SUCCESS, REMOVE_SUGGESTION_SUCCESS } from './actionTypes'
import { getSubscriptionSuggestions } from '../reducers/index'

export const receiveSuggestions = (suggestions) => ({
  type: RECEIVE_SUGGESTIONS,
  suggestions
})

export const addSuggestionSuccess = (suggestion) => ({
  type: ADD_SUGGESTION_SUCCESS,
  suggestion
})

export const removeSuggestionSuccess = (suggestion) => ({
  type: REMOVE_SUGGESTION_SUCCESS,
  suggestion
})

export const addSuggestion = (suggestionData) => (dispatch, getState) => {
  const subscriptionSuggestions = getSubscriptionSuggestions(getState())
  subscriptionSuggestions.send({ suggestion: suggestionData })
}

export const vote = (suggestion_id) => (dispatch, getState) => {
  const subscriptionSuggestions = getSubscriptionSuggestions(getState())
  subscriptionSuggestions.send({ suggestion_id })
}

export const removeSuggestion = (suggestion_id) => (dispatch, getState) => {
  const request = new Request(`${process.env.REACT_APP_SERVER_URL_BASE}/api/v1/suggestions/${suggestion_id}`, {
    method: 'DELETE',
    headers: new Headers({
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    })
  })

  return fetchWrapper(request)
    // All OK.
    .then(data => dispatch(removeSuggestionSuccess(data.suggestion)))
    // Error.
    .catch((err) => {
      let result = ''
      const errors = dataFromReject(err).errors
      if(errors.other) result += errors.other.join(', ')
      if(errors.auth) result += errors.auth.join(', ')
      dispatch(addFlashMessage({ text: result, type: "danger" }));
    })
}
