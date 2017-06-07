import 'isomorphic-fetch'
import { getSubscriptionUsers } from '../reducers/index'
import { ADD_USER_TO_CHATROOM_SUCCESS, REMOVE_USER_FROM_CHATROOM_SUCCESS } from './actionTypes'

export const addUserToChatroomSuccess = (user, chatroom) => ({
  type: ADD_USER_TO_CHATROOM_SUCCESS,
  user,
  chatroom
})

export const removeUserFromChatroomSuccess = (user, chatroom) => ({
  type: REMOVE_USER_FROM_CHATROOM_SUCCESS,
  user,
  chatroom
})

export const addUserToChatroom = (user_id) => (dispatch, getState) => {
  const subscriptionUsers = getSubscriptionUsers(getState())
  subscriptionUsers.send({ user_id })
}

export const removeUserFromChatroom = (user_id) => (dispatch, getState) => {
  const subscriptionUsers = getSubscriptionUsers(getState())
  subscriptionUsers.perform('remove', { user_id })
}
