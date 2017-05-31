import 'isomorphic-fetch'
import { fetchWrapper, dataFromReject } from '../lib/shared'
import { ADD_GUEST_TO_CHATROOM_SUCCESS, ADD_GUEST_TO_CHATROOM_FAILURE } from './actionTypes'

export const addGuestToChatroomSuccess = (user_id, chatroom_id) => ({
  type: ADD_GUEST_TO_CHATROOM_SUCCESS,
  user_id,
  chatroom_id
})

export const addGuestToChatroomFailure = (user_id, chatroom_id, errors) => ({
  type: ADD_GUEST_TO_CHATROOM_FAILURE,
  user_id,
  chatroom_id
})

export const addGuestToChatroom = (user_id, chatroom_id) => (dispatch) => {
  // dispatch(fetchUserRequest(id))

  const request = new Request(`${process.env.REACT_APP_SERVER_URL_BASE}/api/v1/chatrooms/${chatroom_id}/users`, {
    method: 'POST',
    headers: new Headers({
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    }),
    body: JSON.stringify({user_id, chatroom_id})
  })

  return fetchWrapper(request)
    // All OK.
    .then(data => dispatch(addGuestToChatroomSuccess(user_id, chatroom_id)))
    // Error.
    .catch((err) => dispatch(addGuestToChatroomFailure(user_id, chatroom_id, dataFromReject(err).errors)));
}
