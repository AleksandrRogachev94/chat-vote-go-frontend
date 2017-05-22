import 'isomorphic-fetch'
import { fetchWrapper, dataFromReject } from '../lib/shared'
import { RECEIVE_SUGGESTIONS } from './actionTypes'

export const receiveSuggestions = (suggestions) => ({
  type: RECEIVE_SUGGESTIONS,
  suggestions
})
