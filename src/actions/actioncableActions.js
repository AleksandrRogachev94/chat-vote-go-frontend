import { SUBSCRIBE_TO_CHATROOM, UNSUBSCRIBE_FROM_CHATROOM } from './actionTypes'
import { getSubscription, getCable } from '../reducers/index'
import { addMessageSuccess } from './messagesActions'
import isEmpty from 'lodash/isEmpty'

export const unsubscribeFromChatroom = () => (dispatch, getState) => {
  let cable = getCable(getState())
  if(isEmpty(cable)) return
  let subscription = getSubscription(getState())
  if(!isEmpty(subscription)) {
    cable.subscriptions.remove(subscription)
  }
  dispatch({
    type: UNSUBSCRIBE_FROM_CHATROOM
  })
}

// Also unsubscribes from the previous chatroom.
export const subscribeToChatroom = (chatroom_id) => (dispatch, getState) => {
  let cable = getCable(getState())
  if(isEmpty(cable)) return
  dispatch(unsubscribeFromChatroom())

  const subscription = cable.subscriptions.create({ channel: 'ChatroomChannel', chatroom_id }, {
    received: (data) => {
      console.log("----------->ACTIONCABLE GET MESSAGE")
      dispatch(addMessageSuccess(data.message))
    },
    connected: function(data) {
      console.log('----------->ACTIONCABLE CHATROOM SUBSCRIBED')
    },
    disconnected: function(data) {
      console.log('----------->ACTIONCABLE DISCONNECTED')
    }
  })

  dispatch({
    type: SUBSCRIBE_TO_CHATROOM,
    subscription
  })
}
