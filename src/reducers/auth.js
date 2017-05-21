import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER, LOGOUT } from '../actions/actionTypes'

const auth = (state = { isAuthenticated: false, user: {}, cable: {} }, action) => {
  switch(action.type) {

    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
        cable: action.cable
      }

    case LOGOUT:
      return {
        isAuthenticated: false,
        user: {},
        cable: {}
      }

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
