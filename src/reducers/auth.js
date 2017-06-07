import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER, LOGOUT, UPDATE_CABLE } from '../actions/actionTypes'

const auth = (state = {
  isAuthenticated: false,
  user: {},
  cable: {}
}, action) => {
  switch(action.type) {

    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
        cable: action.cable,
      }

    case LOGOUT:
      return {
        isAuthenticated: false,
        user: {},
        cable: {}
      }

    case UPDATE_CABLE:
      return Object.assign({}, state, {
        cable: action.cable
      })

    default:
      return state
  }
}

export default auth

// Selectors

export const getIsAuthenticated = (state) => (
  state.isAuthenticated
)

export const getCurrentUser = (state) => (
  state.user
)

export const getCable = (state) => (
  state.cable
)

export const getSubscriptionMessages = (state) => (
  state.cable.subscriptions.subscriptions.find(s =>
    JSON.parse(s.identifier).channel === "ChatroomMessagesChannel"
  )
)

export const getSubscriptionSuggestions = (state) => (
  state.cable.subscriptions.subscriptions.find(s =>
    JSON.parse(s.identifier).channel === "ChatroomSuggestionsChannel"
  )
)

export const getSubscriptionUsers = (state) => (
  state.cable.subscriptions.subscriptions.find(s =>
    JSON.parse(s.identifier).channel === "ChatroomUsersChannel"
  )
)
