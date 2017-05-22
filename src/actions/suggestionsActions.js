import 'isomorphic-fetch'
import { fetchWrapper, dataFromReject } from '../lib/shared'
import { RECEIVE_SUGGESTIONS, ADD_SUGGESTION_SUCCESS } from './actionTypes'

export const receiveSuggestions = (suggestions) => ({
  type: RECEIVE_SUGGESTIONS,
  suggestions
})

export const addSuggestionSuccess = (suggestion) => ({
  type: ADD_SUGGESTION_SUCCESS,
  suggestion
})
