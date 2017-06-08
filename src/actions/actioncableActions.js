import { browserHistory } from 'react-router'
import { UPDATE_CABLE } from './actionTypes'
import { getCable, getCurrentUser } from '../reducers/index'
import { addMessageSuccess } from './messagesActions'
import { addSuggestionSuccess, removeSuggestionSuccess } from './suggestionsActions'
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
      const audioObj = document.getElementById("new-msg")
      if(audioObj) {
        audioObj.pause()
        audioObj.currentTime=0;
        audioObj.play();
      }
      dispatch(addMessageSuccess(data.message))
    }
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
      switch(data.type) {
        case 'create':
          const audioObj = document.getElementById("new-sug")
          if(audioObj) {
            audioObj.pause()
            audioObj.currentTime=0;
            audioObj.play();
          }
          dispatch(addSuggestionSuccess(data.suggestion))
          break
        case 'destroy':
          dispatch(removeSuggestionSuccess(data.suggestion))
          break
        default:
          break
      }
    }
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
          dispatch(addUserToChatroomSuccess(data.user_chatroom.user, data.user_chatroom.chatroom))
          break
        case 'destroy':
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
    }
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
