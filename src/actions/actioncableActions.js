import { SUBSCRIBE_TO_CHATROOM_MESSAGES, UNSUBSCRIBE_FROM_CHATROOM_MESSAGES,
SUBSCRIBE_TO_CHATROOM_SUGGESTIONS, UNSUBSCRIBE_FROM_CHATROOM_SUGGESTIONS } from './actionTypes'
import { getSubscriptionMessages, getSubscriptionSuggestions, getCable } from '../reducers/index'
import { addMessageSuccess } from './messagesActions'
import { addSuggestionSuccess } from './suggestionsActions'
import isEmpty from 'lodash/isEmpty'

export const unsubscribeFromChatroomMessages = () => (dispatch, getState) => {
  let cable = getCable(getState())
  if(isEmpty(cable)) return
  let subscriptionMessages = getSubscriptionMessages(getState())
  if(!isEmpty(subscriptionMessages)) {
    cable.subscriptions.remove(subscriptionMessages)
  }
  dispatch({
    type: UNSUBSCRIBE_FROM_CHATROOM_MESSAGES
  })
}

// Also unsubscribes from the previous chatroom.
export const subscribeToChatroomMessages = (chatroom_id) => (dispatch, getState) => {
  let cable = getCable(getState())
  if(isEmpty(cable)) return;
  dispatch(unsubscribeFromChatroomMessages())

  const subscriptionMessages = cable.subscriptions.create({
    channel: 'ChatroomMessagesChannel', chatroom_id
  }, {
    received: (data) => {
      console.log("----------->ACTIONCABLE GET MESSAGE")
      dispatch(addMessageSuccess(data.message))
    },
    connected: function(data) {
      console.log('----------->ACTIONCABLE CHATROOM MESSAGES SUBSCRIBED')
    },
    disconnected: function(data) {
      console.log('----------->ACTIONCABLE DISCONNECTED')
    }
  })

  dispatch({
    type: SUBSCRIBE_TO_CHATROOM_MESSAGES,
    subscriptionMessages
  })
}

export const unsubscribeFromChatroomSuggestions = () => (dispatch, getState) => {
  let cable = getCable(getState())
  if(isEmpty(cable)) return
  let subscriptionSuggestions = getSubscriptionSuggestions(getState())
  if(!isEmpty(subscriptionSuggestions)) {
    cable.subscriptions.remove(subscriptionSuggestions)
  }
  dispatch({
    type: UNSUBSCRIBE_FROM_CHATROOM_SUGGESTIONS
  })
}

// Also unsubscribes from the previous chatroom.
export const subscribeToChatroomSuggestions = (chatroom_id) => (dispatch, getState) => {
  let cable = getCable(getState())
  if(isEmpty(cable)) return;
  dispatch(unsubscribeFromChatroomSuggestions())

  const subscriptionSuggestions = cable.subscriptions.create({
    channel: 'ChatroomSuggestionsChannel', chatroom_id
  }, {
    received: (data) => {
      console.log("----------->ACTIONCABLE GET SUGGESTION")
      dispatch(addSuggestionSuccess(data.suggestion))
    },
    connected: function(data) {
      console.log('----------->ACTIONCABLE CHATROOM SUGGESTIONS SUBSCRIBED')
    },
    disconnected: function(data) {
      console.log('----------->ACTIONCABLE DISCONNECTED')
    }
  })

  dispatch({
    type: SUBSCRIBE_TO_CHATROOM_SUGGESTIONS,
    subscriptionSuggestions
  })
}


//---------------------------------------------
// Sum Up

export const subscribeToChatroom = (chatroom_id) => (dispatch) => {
  dispatch(subscribeToChatroomMessages(chatroom_id))
  dispatch(subscribeToChatroomSuggestions(chatroom_id))
}

export const unsubscribeFromChatroom = (chatroom_id) => (dispatch) => {
  dispatch(unsubscribeFromChatroomMessages(chatroom_id))
  dispatch(unsubscribeFromChatroomSuggestions(chatroom_id))
}
