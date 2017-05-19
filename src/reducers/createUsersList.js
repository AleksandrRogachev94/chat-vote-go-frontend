import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, ADD_USERS } from '../actions/actionTypes'
import union from 'lodash/union'

const createUsersList = (title) => {
  return (state = {
    ids: [],
    isFetching: false,
    errors: {}
  }, action) => {

    if(action.title !== title) {
      return state
    }

    switch(action.type) {
      case FETCH_USERS_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          ids: action.users.map(user => user.id),
          errors: {}
        })
      case ADD_USERS:
        return Object.assign({}, state, {
          ids: union(state.ids, action.users.map(user => user.id)),
        })
      case FETCH_USERS_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          errors: action.errors
        })
      case FETCH_USERS_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
          errors: {}
        })

      default:
        return state
    }
  }
}

export default createUsersList

export const getIds = (state) => state.ids
export const getIsFetchingUsers = (state) => state.isFetching
export const getUsersErrors = (state) => state.errors
