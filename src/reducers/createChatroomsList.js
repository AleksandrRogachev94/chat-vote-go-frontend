import { FETCH_CHATROOMS_REQUEST, FETCH_CHATROOMS_SUCCESS, FETCH_CHATROOMS_FAILURE } from '../actions/actionTypes'

const createChatroomsList = (title) => {
  return (state = {
    ids: [],
    isFetching: false,
    errors: {}
  }, action) => {

    if(action.title !== title) {
      return state
    }

    switch(action.type) {
      case FETCH_CHATROOMS_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          ids: action.chatrooms.map(chatroom => chatroom.id),
          errors: {}
        })
      case FETCH_CHATROOMS_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          errors: action.errors
        })
      case FETCH_CHATROOMS_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
          errors: {}
        })

      default:
        return state
    }
  }
}

export default createChatroomsList

export const getIds = (state) => state.ids
export const getIsFetchingChatrooms = (state) => state.isFetching
export const getChatroomsErrors = (state) => state.errors
