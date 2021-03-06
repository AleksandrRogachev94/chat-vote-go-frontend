import { combineReducers } from 'redux'
import usersById, * as fromById from './usersById'
import createUsersList, * as fromList from './createUsersList'

const listByTitle = combineReducers({
  all: createUsersList('all'),
  friends: createUsersList('friends')
})

const users = combineReducers({
  usersById,
  listByTitle,
})

export default users

export const getUsersByTitle = (state, title) => {
  const ids = fromList.getIds(state.listByTitle[title])
  return ids.map(id => fromById.getUser(state.usersById, id))
}
export const getIsFetchingUsers = (state, title) => (
  fromList.getIsFetchingUsers(state.listByTitle[title])
)
export const getUsersErrors = (state, title) => (
  fromList.getUsersErrors(state.listByTitle[title])
)

export const getUser = (state, id) => (
  fromById.getUser(state.usersById, id)
)
export const getIsFetchingUser = (state, id) => (
  fromById.getIsFetchingUser(state.usersById, id)
)
export const getDidInvalidateUser = (state, id) => (
  fromById.getDidInvalidateUser(state.usersById, id)
)
export const getUserErrors = (state, id) => (
  fromById.getUserErrors(state.usersById, id)
)
