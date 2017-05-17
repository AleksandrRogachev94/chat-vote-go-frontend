import 'isomorphic-fetch'
import jwtDecode from 'jwt-decode'
import { fetchWrapper } from '../lib/shared'
import { SET_CURRENT_USER } from './actionTypes'

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user
})

export const logout = () => (dispatch) => {
  localStorage.removeItem('jwt')
  dispatch(setCurrentUser({}))
}

export const login = (userData) => (dispatch) => {
  const request = new Request('/api/v1/login', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    }),
    body: JSON.stringify({user: userData})
  });

  return fetchWrapper(request)
    .then(data => {
      localStorage.setItem('jwt', data.jwt)
      dispatch(setCurrentUser(jwtDecode(data.jwt)))
    })
}
