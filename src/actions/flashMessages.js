import { ADD_FLASH_MESSAGE } from './actionTypes.js'

export function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  }
}
