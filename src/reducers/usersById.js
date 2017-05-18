import { FETCH_USERS_SUCCESS } from '../actions/actionTypes'

const usersById = (state = {}, action) => {
  switch(action.type) {

    // case FETCH_USERS_REQUEST:
    // case FETCH_USERS_FAILURE:
    //   return Object.assign({}, state, {
    //     // [action.id]: profile(state[action.id], action)
    //   })

    case FETCH_USERS_SUCCESS:
      const nextState = Object.assign({}, state)
      action.users.forEach(user => { nextState[user.id] = user })
      return nextState

    default:
      return state
  }
}

export default usersById

// Selectors

export const getUser = (state, id) => state[id]
