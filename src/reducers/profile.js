import { FETCH_PROFILE_REQUEST, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE, INVALIDATE_PROFILE } from '../actions/actionTypes'

const profile = (state = {
  isFetching: false,
  didInvalidate: false,
  profile: {}
}, action) => {

  switch(action.type) {

    case FETCH_PROFILE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })

    case FETCH_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        profile: action.profile
      })

    case FETCH_PROFILE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false
      })

    case INVALIDATE_PROFILE:
      return Object.assign({}, state, {
        didInvalidate: true
      })

    default:
      return state
  }
}

export default profile
