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
  const subscriptionSuggestions = getSubscriptionSuggestions(getState())
  subscriptionSuggestions.perform('remove', { suggestion_id })
}
