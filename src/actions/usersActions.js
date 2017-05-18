import 'isomorphic-fetch'
import { fetchWrapper, dataFromReject } from '../lib/shared'
import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from './actionTypes'

const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
})

const fetchUsersFailure = (errors) => ({
  type: FETCH_USERS_FAILURE,
  errors
})

const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  users
})

export const fetchUsers = () => (dispatch) => {
  dispatch(fetchUsersRequest())

  const request = new Request(`/api/v1/users`, {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Accepts': 'application/json'
    }),
  })

  return fetchWrapper(request)
    // All OK.
    .then(data => dispatch(fetchUsersSuccess(data.users)))
    // Error.
    .catch((err) => dispatch(fetchUsersFailure(dataFromReject(err).errors)));
}

// function shouldFetchProfile(state, id) {
//   const profile = state.profilesByUserId[id]
//   if (!profile) {
//     return true
//   } else if (profile.isFetching) {
//     return false
//   } else {
//     return profile.didInvalidate
//   }
// }
//
// export const fetchProfileIfNeeded = (id) => (dispatch, getState) => {
//   if (shouldFetchProfile(getState(), id)) {
//     return dispatch(fetchProfile(id))
//     // .catch(() => console.log("AAAAAAAAAAAAAAAAAa"))
//   } else {
//     return Promise.resolve()
//   }
// }
