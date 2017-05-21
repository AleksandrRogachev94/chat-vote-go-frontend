import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER, LOGOUT, SUBSCRIBE_TO_CHATROOM, UNSUBSCRIBE_FROM_CHATROOM } from '../actions/actionTypes'

const auth = (state = { isAuthenticated: false, user: {}, cable: {}, subscription: {} }, action) => {
  switch(action.type) {

    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
        cable: action.cable,
        subscription: {}
      }

    case LOGOUT:
      return {
        isAuthenticated: false,
        user: {},
        cable: {},
        subscription: {}
      }

    case SUBSCRIBE_TO_CHATROOM:
      return Object.assign({}, state, {
        subscription: action.subscription
      })

    case UNSUBSCRIBE_FROM_CHATROOM:
      return Object.assign({}, state, {
        subscription: {}
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

export const getSubscription = (state) => (
  state.subscription
)
