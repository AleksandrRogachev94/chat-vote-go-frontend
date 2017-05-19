import 'isomorphic-fetch'
import { fetchWrapper, dataFromReject } from '../lib/shared'
import { getProfile, getIsFetchingProfile, getDidInvalidateProfile } from '../reducers/index'
import { FETCH_PROFILE_REQUEST, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE, INVALIDATE_PROFILE } from './actionTypes'

const fetchProfileRequest = (id) => ({
  type: FETCH_PROFILE_REQUEST,
  id
})

const fetchProfileFailure = (id, errors) => ({
  type: FETCH_PROFILE_FAILURE,
  id,
  errors
})

const fetchProfileSuccess = (profile) => ({
  type: FETCH_PROFILE_SUCCESS,
  profile
})

export const invalidateProfile = (id) => ({
  type: INVALIDATE_PROFILE,
  id
})

export const fetchProfile = (id) => (dispatch) => {
  dispatch(fetchProfileRequest(id))

  const request = new Request(`/api/v1/users/${id}`, {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Accepts': 'application/json'
    }),
  })

  return fetchWrapper(request)
    // All OK.
    .then(data => dispatch(fetchProfileSuccess(data.user)))
    // Error.
    .catch((err) => dispatch(fetchProfileFailure(id, dataFromReject(err).errors)));
}

function shouldFetchProfile(state, id) {
  const profile = getProfile(state, id)
  if (!profile) {
    return true
  } else if (getIsFetchingProfile(state, id)) {
    return false
  } else {
    return getDidInvalidateProfile(state, id)
  }
}

export const fetchProfileIfNeeded = (id) => (dispatch, getState) => {
  if (shouldFetchProfile(getState(), id)) {
    return dispatch(fetchProfile(id))
  } else {
    return Promise.resolve()
  }
}
