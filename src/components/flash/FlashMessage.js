import React from 'react'
import PropTypes from 'prop-types'

const FlashMessage = ({ message, deleteFlashMessage }) => {
  const { type, text, id } = message
  const flashClass = (type === 'success' ? 'notification is-success' : 'notification is-danger')

  return (
    <div className={flashClass}>
    <button onClick={() => deleteFlashMessage(id)} className="delete"></button>
      {text}
    </div>
  )
}

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
}

export default FlashMessage
