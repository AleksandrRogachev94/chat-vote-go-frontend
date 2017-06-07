import { RECEIVE_MESSAGES, ADD_MESSAGE_SUCCESS } from './actionTypes'
import { getSubscriptionMessages } from '../reducers/index'

export const receiveMessages = (messages) => ({
  type: RECEIVE_MESSAGES,
  messages
})

export const addMessageSuccess = (message) => ({
  type: ADD_MESSAGE_SUCCESS,
  message
})

export const addMessage = (messageData) => (dispatch, getState) => {
  const subscriptionMessages = getSubscriptionMessages(getState())
  subscriptionMessages.send({ message: messageData })
}
