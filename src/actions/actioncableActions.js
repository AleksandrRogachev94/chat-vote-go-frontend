import { browserHistory } from 'react-router'
import { UPDATE_CABLE } from './actionTypes'
import { getCable, getCurrentUser } from '../reducers/index'
import { addMessageSuccess } from './messagesActions'
import { addSuggestionSuccess } from './suggestionsActions'
import { addFlashMessage } from './flashMessages'
import { addUserToChatroomSuccess, removeUserFromChatroomSuccess } from './userChatroomsActions'
import isEmpty from 'lodash/isEmpty'

export const unsubscribeFromChatroomMessages = () => (dispatch, getState) => {
  if(isEmpty(getCable(getState()))) return
  let cable = Object.assign({}, getCable(getState()))

  let subscriptionMessages = cable.subscriptions.subscriptions.find(s =>
    JSON.parse(s.identifier).channel === "ChatroomMessagesChannel"
  )
  if(subscriptionMessages) {
    cable.subscriptions.remove(subscriptionMessages)
    dispatch({
      type: UPDATE_CABLE,
      cable
    })
  }
}

// Also unsubscribes from the previous chatroom.
export const subscribeToChatroomMessages = (chatroom_id) => (dispatch, getState) => {
  if(isEmpty(getCable(getState()))) return
  let cable = Object.assign({}, getCable(getState()))
  dispatch(unsubscribeFromChatroomMessages())

  cable.subscriptions.create({
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
    type: UPDATE_CABLE,
    cable
  })
}

export const unsubscribeFromChatroomSuggestions = () => (dispatch, getState) => {
  if(isEmpty(getCable(getState()))) return
  let cable = Object.assign({}, getCable(getState()))

  let subscriptionSuggestions = cable.subscriptions.subscriptions.find(s =>
    JSON.parse(s.identifier).channel === "ChatroomSuggestionsChannel"
  )

  if(subscriptionSuggestions) {
    cable.subscriptions.remove(subscriptionSuggestions)
    dispatch({
      type: UPDATE_CABLE,
      cable
    })
  }
}

// Also unsubscribes from the previous chatroom.
export const subscribeToChatroomSuggestions = (chatroom_id) => (dispatch, getState) => {
  if(isEmpty(getCable(getState()))) return
  let cable = Object.assign({}, getCable(getState()))
  dispatch(unsubscribeFromChatroomSuggestions())

  cable.subscriptions.create({
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
    type: UPDATE_CABLE,
    cable
  })
}

export const unsubscribeFromChatroomUsers = () => (dispatch, getState) => {
  if(isEmpty(getCable(getState()))) return
  let cable = Object.assign({}, getCable(getState()))

  let subscriptionUsers = cable.subscriptions.subscriptions.find(s =>
    JSON.parse(s.identifier).channel === "ChatroomUsersChannel"
  )
  if(subscriptionUsers) {
    cable.subscriptions.remove(subscriptionUsers)
    dispatch({
      type: UPDATE_CABLE,
      cable
    })
  }
}

// Also unsubscribes from the previous chatroom.
export const subscribeToChatroomUsers = (chatroom_id) => (dispatch, getState) => {
  if(isEmpty(getCable(getState()))) return
  let cable = Object.assign({}, getCable(getState()))
  dispatch(unsubscribeFromChatroomUsers())

  cable.subscriptions.create({
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
          let subscriptionUsers = cable.subscriptions.subscriptions.find(s =>
            JSON.parse(s.identifier).channel === "ChatroomUsersChannel"
          )
          if(subscriptionUsers && getCurrentUser(getState()).id === data.user_chatroom.user.id) {
              dispatch(addFlashMessage({ type: "danger", text: `You were excluded from the chatroom: ${data.user_chatroom.chatroom.title}` }))
              browserHistory.push('/')
            }

          dispatch(removeUserFromChatroomSuccess(data.user_chatroom.user, data.user_chatroom.chatroom))
          break
        default:
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
    type: UPDATE_CABLE,
    cable
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
