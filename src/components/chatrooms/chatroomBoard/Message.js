import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { formatDateMessage } from '../../../lib/shared'

const Message = ({ content, owner, created_at, currentUser }) => {

  const msgClass = currentUser.id === owner.id ? "row col-xs-8 col-xs-offset-4" : "row col-xs-8"
  return (
    <article className={msgClass}>
      <div className="message-author col-xs-2">
        <Link to={`/users/${owner.id}`}>
          <p className="msg-user"><img src={owner.avatar_thumb_url} className="avatar-thumb" alt="avatar" /></p>
          <p className="msg-user">{owner.nickname}</p>
        </Link>
      </div>

      <div className="message col-xs-10">
        <div className="message-header">
          <div style={{textAlign: 'right'}}>
            <p className="msg-date">{formatDateMessage(created_at)}</p>
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
  created_at: PropTypes.number.isRequired,
  currentUser: PropTypes.object.isRequired
}

export default Message
