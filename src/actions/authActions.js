import 'isomorphic-fetch'
import ActionCable from 'actioncable'
import jwtDecode from 'jwt-decode'
import isEmpty from 'lodash/isEmpty'
import { getCable } from '../reducers/index'
import { fetchWrapper } from '../lib/shared'
import { SET_CURRENT_USER, LOGOUT } from './actionTypes'

export const setCurrentUser = (user, cable) => ({
  type: SET_CURRENT_USER,
  user,
  cable
})

export const logout = () => (dispatch, getState) => {
  localStorage.removeItem('jwt')
  getCable(getState()).disconnect() // Disconnect AcionCable Connection
  dispatch({
    type: LOGOUT
  })
}

export const login = (userData) => (dispatch, getState) => {
  const request = new Request(process.env.REACT_APP_SERVER_URL_BASE + '/api/v1/login', {
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
      const cable = ActionCable.createConsumer(`${process.env.REACT_APP_SERVER_URL_BASE}/cable?jwt=${data.jwt}`) // Connect to ActionCable
      const user = jwtDecode(data.jwt)
      dispatch(setCurrentUser(user, cable))
    })
}
