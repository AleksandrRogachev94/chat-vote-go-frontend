import 'isomorphic-fetch'
import jwtDecode from 'jwt-decode'
import { SET_CURRENT_USER } from './actionTypes'

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function login(userData) {
  return dispatch => {
    const request = new Request('/api/v1/login', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      }),
      body: JSON.stringify({user: userData})
    });

    return fetch(request)
      .then(response => response.json()
        .then(data =>
          response.ok ? data : Promise.reject({status: response.status, data})
        )
      )
      .then(data => {
        localStorage.setItem('jwt', data.jwt)
        dispatch(setCurrentUser(jwtDecode(data.jwt)))
      })
  }
}
