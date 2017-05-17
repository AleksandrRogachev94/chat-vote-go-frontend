import 'isomorphic-fetch'
import { fetchWrapper } from '../lib/shared'

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
}
