import 'isomorphic-fetch'
import { fetchWrapper, dataFromReject } from '../lib/shared'
// import { getProfile, getIsFetchingProfile, getDidInvalidateProfile } from '../reducers/profilesByUserId'
// import { getIsFetchingChatroom } from '../reducers/index'
import { FETCH_CHATROOM_REQUEST, FETCH_CHATROOM_SUCCESS, FETCH_CHATROOM_FAILURE } from './actionTypes'
import { receiveMessages } from './messagesActions'
import { addUsers } from './usersActions'

const fetchChatroomRequest = (id) => ({
  type: FETCH_CHATROOM_REQUEST,
  id
})

const fetchChatroomFailure = (id, errors) => ({
  type: FETCH_CHATROOM_FAILURE,
  id,
  errors
})

export const fetchChatroomSuccess = (chatroom) => ({
  type: FETCH_CHATROOM_SUCCESS,
  chatroom
})

export const fetchChatroom = (id) => (dispatch, getState) => {
  // if (getIsFetchingChatroom(getState(), title)) return Promise.resolve()
  // debugger
  dispatch(fetchChatroomRequest(id))

  const request = new Request(`/api/v1/chatrooms/${id}`, {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Accepts': 'application/json'
    }),
  })

  return fetchWrapper(request)
    // All OK.
    .then(data => {
      dispatch(receiveMessages(data.chatroom.messages))
      dispatch(addUsers('all', [data.chatroom.owner, ...data.chatroom.guests]))
      dispatch(fetchChatroomSuccess(data.chatroom))
    })
    // Error.
    .catch((err) => dispatch(fetchChatroomFailure(id, dataFromReject(err).errors)))
}

// function shouldFetchProfile(state, id) {
//   const profile = getProfile(state, id)
//   if (!profile) {
//     return true
//   } else if (getIsFetchingProfile(state, id)) {
//     return false
//   } else {
//     return profile.getDidInvalidateProfile(state, id)
//   }
// }
//
// export const fetchProfileIfNeeded = (id) => (dispatch, getState) => {
//   if (shouldFetchProfile(getState(), id)) {
//     return dispatch(fetchProfile(id))
//   } else {
//     return Promise.resolve()
//   }
// }
