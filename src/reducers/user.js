import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, INVALIDATE_USER } from '../actions/actionTypes'

const user = (state = {
  isFetching: false,
  didInvalidate: false,
  errors: {},
  user: {}
}, action) => {

  switch(action.type) {

    case FETCH_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        errors: {}
      })

    case FETCH_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        user: Object.assign({}, state.user, action.user),
        errors: {}
      })

    case FETCH_USER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        errors: action.errors
      })

    case INVALIDATE_USER:
      return Object.assign({}, state, {
        didInvalidate: true
      })

    default:
      return state
  }
}

export default user

// Selectors

export const getUser = (state) => (
  state.user
)

export const getIsFetchingUser = (state) => (
  state.isFetching
)

export const getDidInvalidateUser = (state) => (
  state.didInvalidate
)

export const getUserErrors = (state) => (
  state.errors
)
