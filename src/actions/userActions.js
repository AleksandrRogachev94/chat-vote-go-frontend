import 'isomorphic-fetch'
import jwtDecode from 'jwt-decode'
import ActionCable from 'actioncable'
import { fetchWrapper, dataFromReject } from '../lib/shared'
import { getUser, getIsFetchingUser, getDidInvalidateUser, getCable } from '../reducers/index'
import { setCurrentUser } from './authActions'
import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, INVALIDATE_USER } from './actionTypes'
import isEmpty from 'lodash/isEmpty'

const fetchUserRequest = (id) => ({
  type: FETCH_USER_REQUEST,
  id
})

const fetchUserFailure = (id, errors) => ({
  type: FETCH_USER_FAILURE,
  id,
  errors
})

export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  user
})

export const invalidateUser = (id) => ({
  type: INVALIDATE_USER,
  id
})

export const fetchUserProfile = (id) => (dispatch) => {
  dispatch(fetchUserRequest(id))

  const request = new Request(`${process.env.REACT_APP_SERVER_URL_BASE}/api/v1/users/${id}`, {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Accepts': 'application/json'
    }),
  })

  return fetchWrapper(request)
    // All OK.
    .then(data => dispatch(fetchUserSuccess(data.user)))
    // Error.
    .catch((err) => dispatch(fetchUserFailure(id, dataFromReject(err).errors)));
}

function shouldFetchUserProfile(state, id) {
  const user = getUser(state, id)
  // debugger
  if (!user) {
    return true
  } else if (getIsFetchingUser(state, id)) {
    return false
  } else if (!user.email) { // Basic user object doesn't contain email (it contains nickname)
    return true
  } else {
    return getDidInvalidateUser(state, id)
  }
}

export const fetchUserProfileIfNeeded = (id) => (dispatch, getState) => {
  if (shouldFetchUserProfile(getState(), id)) {
    return dispatch(fetchUserProfile(id))
  } else {
    return Promise.resolve()
  }
}

export const profileUpdateRequest = (userData, id) => (dispatch, getState) => {
  const request = new Request(process.env.REACT_APP_SERVER_URL_BASE + `/api/v1/users/${id}`, {
    method: 'PATCH',
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
