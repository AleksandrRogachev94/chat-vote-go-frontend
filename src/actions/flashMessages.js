import { ADD_FLASH_MESSAGE } from './actionTypes.js'
import { DELETE_FLASH_MESSAGE } from './actionTypes.js'

export const addFlashMessage = (message) => ({
  type: ADD_FLASH_MESSAGE,
  message
})

export const deleteFlashMessage = (id) => ({
  type: DELETE_FLASH_MESSAGE,
  id
})
