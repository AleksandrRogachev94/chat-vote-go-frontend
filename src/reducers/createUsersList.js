import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from '../actions/actionTypes'

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
