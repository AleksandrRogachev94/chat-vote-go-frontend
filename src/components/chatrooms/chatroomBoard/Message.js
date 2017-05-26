import React from 'react'
import PropTypes from 'prop-types'
import { formatDateMessage } from '../../../lib/shared'

const Message = ({ content, owner, created_at }) => {
  return (
    <article className="message">
      <div className="message-header row">
        <div className="col-xs-4">
          <small><b>{owner}</b></small>
        </div>
        <div className="col-xs-8" style={{textAlign: 'right'}}>
        <small><em>{formatDateMessage(created_at)}</em></small>
        </div>
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
