import 'isomorphic-fetch'
import { ADD_PROFILE } from './actionTypes'

export function addProfile(profile) {
  return {
    type: ADD_PROFILE,
    profile
  }
}

export function fetchProfile(id) {
  return dispatch => {
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
      .then(data => dispatch(addProfile(data.user)))
  }
}
