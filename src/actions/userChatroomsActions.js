import 'isomorphic-fetch'
import { getSubscriptionUsers } from '../reducers/index'
import { ADD_GUEST_TO_CHATROOM_SUCCESS, REMOVE_USER_FROM_CHATROOM_SUCCESS } from './actionTypes'

export const addGuestToChatroomSuccess = (user, chatroom) => ({
  type: ADD_GUEST_TO_CHATROOM_SUCCESS,
  user,
  chatroom
})

export const removeUserFromChatroomSuccess = (user, chatroom) => ({
  type: REMOVE_USER_FROM_CHATROOM_SUCCESS,
  user,
  chatroom
})

export const addGuestToChatroom = (user_id) => (dispatch, getState) => {
  const subscriptionUsers = getSubscriptionUsers(getState())
  subscriptionUsers.send({ user_id })
}

export const removeUserFromChatroom = (user_id) => (dispatch) => {
  // const request = new Request(`${process.env.REACT_APP_SERVER_URL_BASE}/api/v1/chatrooms/${chatroom_id}/users/${user_id}`, {
  //   method: 'DELETE',
  //   headers: new Headers({
  //     'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
  //     'Content-Type': 'application/json',
  //     'Accepts': 'application/json'
  //   }),
  //   body: JSON.stringify({user_id, chatroom_id})
  // })
  //
  // return fetchWrapper(request)
  //   // All OK.
  //   .then(data => dispatch(removeUserFromChatroomSuccess(user_id, chatroom_id)))
  //   // Error.
  //   .catch((err) => dispatch(removeUserFromChatroomFailure(user_id, chatroom_id, dataFromReject(err).errors)));
}
