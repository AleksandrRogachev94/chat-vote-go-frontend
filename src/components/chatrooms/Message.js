import React from 'react'
import PropTypes from 'prop-types'
import { formatDateMessage } from '../../lib/shared'

const Message = ({ content, owner, created_at }) => {
  return (
    <article className="message">
      <div className="message-header">
        <small><b>{owner}</b>&nbsp;&nbsp;&nbsp;&nbsp;<em>{formatDateMessage(created_at)}</em></small>
      </div>
      <div className="message-body">{content}</div>
    </article>
  )
}

Message.propTypes = {
  content: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  created_at: PropTypes.number.isRequired
}

export default Message
