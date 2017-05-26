import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, INVALIDATE_USER, FETCH_USERS_SUCCESS, ADD_USERS } from '../actions/actionTypes'
import { fetchUserSuccess } from '../actions/userActions'
import user, * as fromUser from './user'

const usersById = (state = {}, action) => {
  switch(action.type) {
    case FETCH_USERS_SUCCESS:
    case ADD_USERS:
      const nextState = Object.assign({}, state)
      action.users.forEach(userObj => {
        nextState[userObj.id] = user(state[userObj.id], fetchUserSuccess(userObj))
      })
      return nextState

    case FETCH_USER_REQUEST:
    case FETCH_USER_FAILURE:
    case INVALIDATE_USER:
      return Object.assign({}, state, {
        [action.id]: user(state[action.id], action)
      })

    case FETCH_USER_SUCCESS:
      return Object.assign({}, state, {
        [action.user.id]: user(state[action.user.id], action)
      })

    default:
      return state
  }
}

export default usersById

// Selectors

export const getUser = (state, id) => (
  state[id] && fromUser.getUser(state[id])
)

export const getIsFetchingUser = (state, id) => (
  state[id] && fromUser.getIsFetchingUser(state[id])
)

export const getDidInvalidateUser = (state, id) => (
  state[id] && fromUser.getDidInvalidateUser(state[id])
)

export const getUserErrors = (state, id) => (
  state[id] && fromUser.getUserErrors(state[id])
)
