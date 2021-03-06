import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from '../actions/actionTypes'


export default function flashMessages(state = [], action) {
  switch(action.type) {
    case ADD_FLASH_MESSAGE:
      return [
        ...state,
        action.message
      ]

    case DELETE_FLASH_MESSAGE:
      const index = state.findIndex((msg) => msg.id === action.id)
      if(index >= 0) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ]
      } else {
        return state
      }

    default:
      return state
  }
}
