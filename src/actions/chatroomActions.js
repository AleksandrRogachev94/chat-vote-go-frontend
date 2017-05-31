import 'isomorphic-fetch'
import { fetchWrapper, dataFromReject } from '../lib/shared'
// import { getProfile, getIsFetchingProfile, getDidInvalidateProfile } from '../reducers/profilesByUserId'
import { getIsFetchingChatroom } from '../reducers/index'
import { FETCH_CHATROOM_REQUEST, FETCH_CHATROOM_SUCCESS, FETCH_CHATROOM_FAILURE, ADD_CHATROOM_SUCCESS, ADD_CHATROOM_FAILURE } from './actionTypes'
import { receiveMessages } from './messagesActions'
import { receiveSuggestions } from './suggestionsActions'
import { addUsers } from './usersActions'

const fetchChatroomRequest = (id) => ({
  type: FETCH_CHATROOM_REQUEST,
  id
})

const fetchChatroomFailure = (id, errors) => ({
  type: FETCH_CHATROOM_FAILURE,
  id,
  errors
})

export const fetchChatroomSuccess = (chatroom) => ({
  type: FETCH_CHATROOM_SUCCESS,
  chatroom
})

export const fetchChatroom = (id) => (dispatch, getState) => {
  if (getIsFetchingChatroom(getState(), id)) return Promise.resolve()

  dispatch(fetchChatroomRequest(id))

  const request = new Request(`${process.env.REACT_APP_SERVER_URL_BASE}/api/v1/chatrooms/${id}`, {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Accepts': 'application/json'
    }),
  })

  return fetchWrapper(request)
    // All OK.
    .then(data => {
      dispatch(receiveMessages(data.chatroom.messages))
      dispatch(receiveSuggestions(data.chatroom.suggestions))
      dispatch(addUsers('all', [data.chatroom.owner, ...data.chatroom.guests]))
      dispatch(fetchChatroomSuccess(data.chatroom))
    })
    // Error.
    .catch((err) => dispatch(fetchChatroomFailure(id, dataFromReject(err).errors)))
}


export const addChatroomSuccess = (chatroom) => ({
  type: ADD_CHATROOM_SUCCESS,
  chatroom
})

export const addChatroomFailure = () => ({
  type: ADD_CHATROOM_FAILURE,
})

export const addChatroom = (chatroomData) => (dispatch) => {
  // dispatch(fetchUserRequest(id))

  const request = new Request(`${process.env.REACT_APP_SERVER_URL_BASE}/api/v1/chatrooms`, {
    method: 'POST',
    headers: new Headers({
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    }),
    body: JSON.stringify({chatroom: chatroomData})
  })

  return fetchWrapper(request)
    // All OK.
    .then(data => dispatch(addChatroomSuccess(data.chatroom)))
    // Error.
    .catch((err) => dispatch(addChatroomFailure(dataFromReject(err).errors)));
}
