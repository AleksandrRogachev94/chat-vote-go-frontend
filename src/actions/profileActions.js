import 'isomorphic-fetch'
import { fetchWrapper } from '../lib/shared'
import { FETCH_PROFILE_REQUEST, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE, INVALIDATE_PROFILE } from './actionTypes'

export const fetchProfileRequest = (id) => ({
  type: FETCH_PROFILE_REQUEST,
  id
})

export const fetchProfileFailure = (id) => ({
  type: FETCH_PROFILE_FAILURE,
  id
})

export const invalidateProfile = (id) => ({
  type: INVALIDATE_PROFILE,
  id
})

export const fetchProfileSuccess = (profile) => ({
  type: FETCH_PROFILE_SUCCESS,
  profile
})

export const fetchProfile = (id) => (dispatch) => {
  dispatch(fetchProfileRequest(id))

  const request = new Request(`/api/v1/users/${id}`, {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Accepts': 'application/json'
    }),
  });

  return fetchWrapper(request)
    // All OK.
    .then(data => dispatch(fetchProfileSuccess(data.user)))
    // Error. Rethrow promise for further handling in component.
    .catch((err) => { console.log("RETHRIOWING ERROR!s"); console.log(err); dispatch(fetchProfileFailure(id)); throw err })
}

function shouldFetchProfile(state, id) {
  const profile = state.profilesByUserId[id]
  if (!profile) {
    return true
  } else if (profile.isFetching) {
    return false
  } else {
    return profile.didInvalidate
  }
}

export const fetchProfileIfNeeded = (id) => (dispatch, getState) => {
  if (shouldFetchProfile(getState(), id)) {
    return dispatch(fetchProfile(id))
    // .catch(() => console.log("AAAAAAAAAAAAAAAAAa"))
  } else {
    return Promise.resolve()
  }
}
