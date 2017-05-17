import { ADD_PROFILE } from '../actions/actionTypes'

const profiles = (state = [], action) => {
  switch(action.type) {

    case ADD_PROFILE:
      let isNew = true
        const newState = state.map(profile => {
          if(profile.id === action.profile.id) {
            isNew = false
            return action.profile
          } else {
            return profile
          }
        })

      if(isNew) newState.push(action.profile)
      return newState

    default:
      return state
  }
}

export default profiles
