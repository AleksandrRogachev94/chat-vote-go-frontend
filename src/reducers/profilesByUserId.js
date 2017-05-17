import { FETCH_PROFILE_REQUEST, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE, INVALIDATE_PROFILE } from '../actions/actionTypes'
import profile, * as fromProfile from './profile'

const profilesByUserId = (state = {}, action) => {
  switch(action.type) {

    case FETCH_PROFILE_REQUEST:
    case FETCH_PROFILE_FAILURE:
    case INVALIDATE_PROFILE:
      return Object.assign({}, state, {
        [action.id]: profile(state[action.id], action)
      })

    case FETCH_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        [action.profile.id]: profile(state[action.profile.id], action)
      })

    default:
      return state
  }
}

export default profilesByUserId

// Selectors

export const getProfile = (state, id) => (
  state[id] && fromProfile.getProfile(state[id])
)

export const getIsFetchingProfile = (state, id) => (
  state[id] && fromProfile.getIsFetching(state[id])
)
