import 'isomorphic-fetch'
import { fetchWrapper, dataFromReject } from '../lib/shared'
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

    // .then(() => { if(!isEmpty(this.state.errors)) this.setState({ errors: {} }) })
    // .catch((fail) => this.setState(dataFromReject(fail)))

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
