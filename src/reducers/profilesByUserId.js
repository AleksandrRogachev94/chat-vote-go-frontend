import { FETCH_PROFILE_REQUEST, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE, INVALIDATE_PROFILE } from '../actions/actionTypes'
import profile from './profile'

const profilesByUserId = (state = {}, action) => {
  switch(action.type) {

    case FETCH_PROFILE_REQUEST:
    case FETCH_PROFILE_FAILURE:
    case INVALIDATE_PROFILE:
      return Object.assign({}, state, {
        [action.id]: profile(state[action.id], action)
      })
      // let isNew = true
      //   const newState = state.map(profile => {
      //     if(profile.id === action.profile.id) {
      //       isNew = false
      //       return action.profile
      //     } else {
      //       return profile
      //     }
      //   })
      //
      // if(isNew) newState.push(action.profile)
      // return newState

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

export const getProfileByUserId = (state, id) => {
  return state[id] && state[id].profile
}

export const getIsLoadingByUserId = (state, id) => (
  state[id] && state[id].isFetching
)
