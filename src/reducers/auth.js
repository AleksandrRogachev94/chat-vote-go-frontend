import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER } from '../actions/actionTypes'

const auth = (state = { isAuthenticated: false, user: {} }, action) => {
  switch(action.type) {

    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
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
