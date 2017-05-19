import { combineReducers } from 'redux'
import chatroomsById, * as fromById from './chatroomsById'
import createChatroomsList, * as fromList from './createChatroomsList'

const listByTitle = combineReducers({
  guest: createChatroomsList('guest'),
  own: createChatroomsList('own')
})

const chatrooms = combineReducers({
  chatroomsById,
  listByTitle
})

export default chatrooms

export const getChatroomsByTitle = (state, title) => {
  const ids = fromList.getIds(state.listByTitle[title])
  return ids.map(id => fromById.getChatroom(state.chatroomsById, id))
}
export const getIsFetchingChatrooms = (state, title) => (
  fromList.getIsFetchingChatrooms(state.listByTitle[title])
)
export const getChatroomsErrors = (state, title) => (
  fromList.getChatroomsErrors(state.listByTitle[title])
)

export const getChatroom = (state, id) => (
  fromById.getChatroom(state.chatroomsById, id)
)
export const getIsFetchingChatroom = (state, id) => (
  fromById.getIsFetchingChatroom(state.chatroomsById, id)
)
export const getChatroomErrors = (state, id) => (
  fromById.getChatroomErrors(state.chatroomsById, id)
)
