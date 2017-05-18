import 'isomorphic-fetch'
import { fetchWrapper, dataFromReject } from '../lib/shared'
// import { getIsFetchingUsers } from '../reducers/index'
import { FETCH_CHATROOMS_REQUEST, FETCH_CHATROOMS_SUCCESS, FETCH_CHATROOMS_FAILURE } from './actionTypes'

const fetchChatroomsRequest = () => ({
  type: FETCH_CHATRROMS_REQUEST,
  title
})

const fetchChatroomsFailure = (errors) => ({
  type: FETCH_CHATROOMS_FAILURE,
  title,
  errors
})

const fetchChatroomsSuccess = (chatrooms) => ({
  type: FETCH_CHATROOMS_SUCCESS,
  title,
  users
})

export const fetchChatrooms = () => (dispatch, getState) => {
  if (getIsFetchingChatrooms(getState())) return Promise.resolve()

  dispatch(fetchChatroomsRequest())

  const request = new Request(`/api/v1/chatrooms`, {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Accepts': 'application/json'
    }),
  })

  return fetchWrapper(request)
    // All OK.
    .then(data => dispatch(fetchChatroomsSuccess(title, data.users)))
    // Error.
    .catch((err) => dispatch(fetchChatroomsFailure(title, dataFromReject(err).errors)));
}
