import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { formatDateMessage } from '../../../lib/shared'

const Message = ({ content, owner, created_at }) => {
  return (
    <article className="row" style={{width: '100%'}}>
      <div className="message-author col-xs-2">
        <Link to={`/users/${owner.id}`}>
          <p><img src={owner.avatar_thumb_url} className="avatar-thumb" alt="avatar" /></p>
          <p>{owner.nickname}</p>
        </Link>
      </div>

      <div className="message col-xs-10">
        <div className="message-header">
          <div style={{textAlign: 'right'}}>
            <small><em>{formatDateMessage(created_at)}</em></small>
          </div>
        </div>
        <div className="message-body">{content}</div>
      </div>
    </article>
  )
}

Message.propTypes = {
  content: PropTypes.string.isRequired,
  owner: PropTypes.object.isRequired,
  created_at: PropTypes.number.isRequired
}

export default Message
