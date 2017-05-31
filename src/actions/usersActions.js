import 'isomorphic-fetch'
import { fetchWrapper, dataFromReject } from '../lib/shared'
import { getIsFetchingUsers } from '../reducers/index'
import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, ADD_USERS } from './actionTypes'

const fetchUsersRequest = (title) => ({
  type: FETCH_USERS_REQUEST,
  title
})

export const addUsers = (title, users) => ({
  type: ADD_USERS,
  title,
  users
})

const fetchUsersFailure = (title, errors) => ({
  type: FETCH_USERS_FAILURE,
  title,
  errors
})

const fetchUsersSuccess = (title, users) => ({
  type: FETCH_USERS_SUCCESS,
  title,
  users
})

export const fetchUsers = (title) => (dispatch, getState) => {
  if (getIsFetchingUsers(getState(), title)) return Promise.resolve()

  dispatch(fetchUsersRequest(title))

  const request = new Request(process.env.REACT_APP_SERVER_URL_BASE + "/api/v1/users", {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Accepts': 'application/json'
    }),
  })

  return fetchWrapper(request)
    // All OK.
    .then((data) => dispatch(fetchUsersSuccess(title, data.users)))
    // Error.
    .catch((err) => dispatch(fetchUsersFailure(title, dataFromReject(err).errors)));
}
