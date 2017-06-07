import { SUBSCRIBE_TO_CHATROOM_MESSAGES, UNSUBSCRIBE_FROM_CHATROOM_MESSAGES,
  SUBSCRIBE_TO_CHATROOM_SUGGESTIONS, UNSUBSCRIBE_FROM_CHATROOM_SUGGESTIONS,
  SUBSCRIBE_TO_CHATROOM_USERS, UNSUBSCRIBE_FROM_CHATROOM_USERS } from './actionTypes'
import { getSubscriptionMessages, getSubscriptionSuggestions, getSubscriptionUsers, getCable } from '../reducers/index'
import { addMessageSuccess } from './messagesActions'
import { addSuggestionSuccess } from './suggestionsActions'
import { addUserToChatroomSuccess, removeUserFromChatroomSuccess } from './userChatroomsActions'
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
    },
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
    },
  })

  dispatch({
    type: SUBSCRIBE_TO_CHATROOM_SUGGESTIONS,
    subscriptionSuggestions
  })
}

export const unsubscribeFromChatroomUsers = () => (dispatch, getState) => {
  let cable = getCable(getState())
  if(isEmpty(cable)) return
  let subscriptionUsers = getSubscriptionUsers(getState())
  if(!isEmpty(subscriptionUsers)) {
    cable.subscriptions.remove(subscriptionUsers)
  }
  dispatch({
    type: UNSUBSCRIBE_FROM_CHATROOM_USERS
  })
}

// Also unsubscribes from the previous chatroom.
export const subscribeToChatroomUsers = (chatroom_id) => (dispatch, getState) => {
  let cable = getCable(getState())
  if(isEmpty(cable)) return;
  dispatch(unsubscribeFromChatroomUsers())

  const subscriptionUsers = cable.subscriptions.create({
    channel: 'ChatroomUsersChannel', chatroom_id
  }, {
    received: (data) => {
      switch(data.type) {
        case 'create':
          console.log("----------->ACTIONCABLE ADD USER")
          dispatch(addUserToChatroomSuccess(data.user_chatroom.user, data.user_chatroom.chatroom))
          break
        case 'destroy':
          console.log("----------->ACTIONCABLE DELETE USER")
          dispatch(removeUserFromChatroomSuccess(data.user_chatroom.user, data.user_chatroom.chatroom))
          break
      }
    },
    connected: function(data) {
      console.log('----------->ACTIONCABLE CHATROOM USERS SUBSCRIBED')
    },
    disconnected: function(data) {
      console.log('----------->ACTIONCABLE DISCONNECTED')
    },
  })

  dispatch({
    type: SUBSCRIBE_TO_CHATROOM_USERS,
    subscriptionUsers
  })
}


//---------------------------------------------
// Sum Up

export const subscribeToChatroom = (chatroom_id) => (dispatch) => {
  dispatch(subscribeToChatroomMessages(chatroom_id))
  dispatch(subscribeToChatroomSuggestions(chatroom_id))
  dispatch(subscribeToChatroomUsers(chatroom_id))
}

export const unsubscribeFromChatroom = (chatroom_id) => (dispatch) => {
  dispatch(unsubscribeFromChatroomMessages(chatroom_id))
  dispatch(unsubscribeFromChatroomSuggestions(chatroom_id))
  dispatch(unsubscribeFromChatroomUsers(chatroom_id))
}
