import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER, LOGOUT, SUBSCRIBE_TO_CHATROOM_MESSAGES, UNSUBSCRIBE_FROM_CHATROOM_MESSAGES,
SUBSCRIBE_TO_CHATROOM_SUGGESTIONS, UNSUBSCRIBE_FROM_CHATROOM_SUGGESTIONS } from '../actions/actionTypes'

const auth = (state = {
  isAuthenticated: false,
  user: {},
  cable: {},
  subscriptionMessages: {},
  subscriptionSuggestions: {},
  subscriptionUsers: {}
}, action) => {
  switch(action.type) {

    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
        cable: action.cable,
        subscriptionMessages: {},
        subscriptionSuggestions: {}
      }

    case LOGOUT:
      return {
        isAuthenticated: false,
        user: {},
        cable: {},
        subscriptionMessages: {},
        subscriptionSuggestions: {}
      }

    case SUBSCRIBE_TO_CHATROOM_MESSAGES:
      return Object.assign({}, state, {
        subscriptionMessages: action.subscriptionMessages
      })

    case UNSUBSCRIBE_FROM_CHATROOM_MESSAGES:
      return Object.assign({}, state, {
        subscriptionMessages: {}
      })

    case SUBSCRIBE_TO_CHATROOM_SUGGESTIONS:
      return Object.assign({}, state, {
        subscriptionSuggestions: action.subscriptionSuggestions
      })

    case UNSUBSCRIBE_FROM_CHATROOM_SUGGESTIONS:
      return Object.assign({}, state, {
        subscriptionSuggestions: {}
      })

    case SUBSCRIBE_TO_CHATROOM_USERS:
      return Object.assign({}, state, {
        subscriptionUsers: action.subscriptionUsers
      })

    case UNSUBSCRIBE_FROM_CHATROOM_USERS:
      return Object.assign({}, state, {
        subscriptionUsers: {}
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
  state.subscriptionMessages
)

export const getSubscriptionSuggestions = (state) => (
  state.subscriptionSuggestions
)

export const getSubscriptionUsers = (state) => (
  state.subscriptionUsers
)
