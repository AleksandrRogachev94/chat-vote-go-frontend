import React from 'react'
import PropTypes from 'prop-types'

const FlashMessage = ({ message, deleteFlashMessage }) => {
  const { type, text, id } = message
  const flashClass = (type === 'success' ? 'alert alert-success' : 'alert alert-danger')

  return (
    <div className={flashClass} role="alert">
      <button type="button" className="close" onClick={() => deleteFlashMessage(id)}>
      <span aria-hidden="true">&times;</span>
      </button>
      {text}
    </div>
  )
}

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
}

export default FlashMessage
