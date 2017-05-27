import 'isomorphic-fetch'
import jwtDecode from 'jwt-decode'
import ActionCable from 'actioncable'
import isEmpty from 'lodash/isEmpty'
import { getCable } from '../reducers/index'
import { fetchWrapper } from '../lib/shared'
import { setCurrentUser } from './authActions'

export const userSignupRequest = (userData) => (dispatch, getState) => {
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

      if(!isEmpty(getCable(getState()))) getCable(getState()).disconnect()
      const cable = ActionCable.createConsumer(`/cable?jwt=${data.jwt}`) // Connect to ActionCable
      const user = jwtDecode(data.jwt)
      dispatch(setCurrentUser(user, cable))
    })
}
