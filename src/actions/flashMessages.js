import shortid from 'shortid'
import { ADD_FLASH_MESSAGE } from './actionTypes.js'
import { DELETE_FLASH_MESSAGE } from './actionTypes.js'

export const createFlashMessage = (message) => ({
  type: ADD_FLASH_MESSAGE,
  message
})

export const deleteFlashMessage = (id) => ({
  type: DELETE_FLASH_MESSAGE,
  id
})

export const addFlashMessage = (message) => (dispatch) => {
  message.id = shortid.generate()
  dispatch(createFlashMessage(message))
  setTimeout(() => dispatch(deleteFlashMessage(message.id)), 5000)
}
