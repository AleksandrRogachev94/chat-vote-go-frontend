import { combineReducers } from 'redux'
import chatroomsById, * as fromById from './usersById'
import createChatroomsList, * as fromList from './createUsersList'

const listByTitle = combineReducers({
  guestChats: createChatroomsList('guest'),
  ownChats: createChatroomsList('own')
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
