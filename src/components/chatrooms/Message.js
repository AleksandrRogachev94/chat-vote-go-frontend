import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ content, owner }) => {
  return (
    <div className="message">{content} FROM {owner}</div>
  )
}

Message.propTypes = {
  content: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired
}

export default Message
