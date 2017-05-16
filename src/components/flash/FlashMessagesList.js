import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FlashMessage from './FlashMessage'
import { deleteFlashMessage } from '../../actions/flashMessages'

const FlashMessagesList = ({ messages, deleteFlashMessage }) => {

  const htmlMessages = messages.map(msg => (
    <FlashMessage key={msg.id} message={msg} deleteFlashMessage={deleteFlashMessage} />
  ))

  return (
    <div>
      {htmlMessages}
    </div>
  )
}

FlashMessagesList.propTypes = {
  messages: PropTypes.array.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  messages: state.flashMessages
})

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessagesList)
