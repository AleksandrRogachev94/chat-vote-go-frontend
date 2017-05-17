import 'isomorphic-fetch'
import jwtDecode from 'jwt-decode'
import { fetchWrapper } from '../lib/shared'
import { setCurrentUser } from './authActions'

export const userSignupRequest = (userData) => (dispatch) => {
  const request = new Request('/api/v1/signup', {
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
