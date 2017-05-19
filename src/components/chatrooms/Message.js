import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ content, owner }) => {
  return (
    <article className="message">
      <div className="message-header">{owner}</div>
      <div className="message-body">{content}</div>
    </article>
  )
}

Message.propTypes = {
  content: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired
}

export default Message
