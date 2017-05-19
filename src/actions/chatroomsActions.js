import 'isomorphic-fetch'
import { fetchWrapper, dataFromReject } from '../lib/shared'
import { getIsFetchingChatrooms } from '../reducers/index'
import { FETCH_CHATROOMS_REQUEST, FETCH_CHATROOMS_SUCCESS, FETCH_CHATROOMS_FAILURE } from './actionTypes'

const fetchChatroomsRequest = (title) => ({
  type: FETCH_CHATROOMS_REQUEST,
  title
})

const fetchChatroomsFailure = (title, errors) => ({
  type: FETCH_CHATROOMS_FAILURE,
  title,
  errors
})

const fetchChatroomsSuccess = (title, chatrooms) => ({
  type: FETCH_CHATROOMS_SUCCESS,
  title,
  chatrooms
})

export const fetchChatrooms = (title) => (dispatch, getState) => {
  if (getIsFetchingChatrooms(getState(), title)) return Promise.resolve()

  dispatch(fetchChatroomsRequest(title))

  const request = new Request(`/api/v1/chatrooms?type=${title}`, {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Accepts': 'application/json'
    }),
  })

  return fetchWrapper(request)
    // .then(res => { debugger })
    // All OK.
    .then((data) => dispatch(fetchChatroomsSuccess(title, data.chatrooms)))
    // Error.
    .catch((err) => dispatch(fetchChatroomsFailure(title, dataFromReject(err).errors)))
}

export const fetchAllChatrooms = () => (dispatch) => {
  dispatch(fetchChatrooms('own'))
  dispatch(fetchChatrooms('guest'))
}
