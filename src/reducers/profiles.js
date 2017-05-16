import { ADD_PROFILE } from '../actions/actionTypes'

const profiles = (state = [], action) => {
  switch(action.type) {

    case ADD_PROFILE:
      return [...state, action.profile]

    default:
      return state
  }
}

export default profiles
