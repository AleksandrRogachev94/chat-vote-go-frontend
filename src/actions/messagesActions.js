import { RECEIVE_MESSAGES } from './actionTypes'

export const receiveMessages = (messages) => ({
  type: RECEIVE_MESSAGES,
  messages
})
