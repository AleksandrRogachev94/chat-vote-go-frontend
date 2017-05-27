import 'isomorphic-fetch'
import { RECEIVE_MESSAGES, ADD_MESSAGE_SUCCESS, ADD_MESSAGE_FAILURE } from './actionTypes'
import { getSubscriptionMessages } from '../reducers/index'

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

export const addMessage = (messageData) => (dispatch, getState) => {
  const subscriptionMessages = getSubscriptionMessages(getState())
  subscriptionMessages.send({ message: messageData })
}
