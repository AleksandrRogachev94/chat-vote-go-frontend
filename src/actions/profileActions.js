import 'isomorphic-fetch'
import { FETCH_PROFILE_REQUEST, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE, INVALIDATE_PROFILE } from './actionTypes'

export function fetchProfileRequest(id) {
  return {
    type: FETCH_PROFILE_REQUEST,
    id
  }
}

export function fetchProfileFailure(id) {
  return {
    type: FETCH_PROFILE_FAILURE,
    id
  }
}

export function invalidateProfile(id) {
  return {
    type: INVALIDATE_PROFILE,
    id
  }
}

export function fetchProfileSuccess(profile) {
  return {
    type: FETCH_PROFILE_SUCCESS,
    profile
  }
}

export function fetchProfile(id) {
  return dispatch => {
    dispatch(fetchProfileRequest(id))

    const request = new Request(`/api/v1/users/${id}`, {
      method: 'GET',
      headers: new Headers({
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Accepts': 'application/json'
      }),
    });

    return fetch(request)
      .then(response => response.json()
        .then(data =>
          response.ok ? data : Promise.reject({status: response.status, data})
        )
      )
      // All OK.
      .then(data => dispatch(fetchProfileSuccess(data.user)))
      // Error. Rethrow promise for further handling in component.
      .catch((err) => { dispatch(fetchProfileFailure(id)); throw err })
  }
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

export function fetchProfileIfNeeded(id) {
  return (dispatch, getState) => {
    if (shouldFetchProfile(getState(), id)) {
      return dispatch(fetchProfile(id))
    } else {
      return Promise.resolve()
    }
  }
}
