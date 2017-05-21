import 'isomorphic-fetch'
import { fetchWrapper, dataFromReject } from '../lib/shared'
import { RECEIVE_MESSAGES, ADD_MESSAGE_SUCCESS, ADD_MESSAGE_FAILURE } from './actionTypes'

export const receiveMessages = (messages) => ({
  type: RECEIVE_MESSAGES,
  messages
})

export const addMessageSuccess = (message) => ({
  type: ADD_MESSAGE_SUCCESS,
  message
})

export const addMessageFailure = (chatroom_id) => ({
  type: ADD_MESSAGE_FAILURE,
  chatroom_id
})

export const addMessage = (chatroom_id, messageData) => (dispatch) => {
  // dispatch(fetchUserRequest(id))

  const request = new Request(`/api/v1/chatrooms/${chatroom_id}/messages`, {
    method: 'POST',
    headers: new Headers({
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    }),
    body: JSON.stringify({message: messageData})
  })

  return fetchWrapper(request)
    // All OK.
    // .then(data => dispatch(addMessageSuccess(data.message)))
    .then(() => console.log("DONE FETCHING"))
    // Error.
    .catch((err) => dispatch(addMessageFailure(chatroom_id, dataFromReject(err).errors)));
}
