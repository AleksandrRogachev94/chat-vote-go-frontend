import React from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '../../../lib/shared'
import Message from './Message'
import MessageForm from './MessageForm'

const ChatroomBoard = (props) => {

  let messages
  if(props.messages) messages = props.messages.map((msg, i) => (
    <div key={msg.id} >
      {i === 0 && <p className="separator">{formatDate(msg.created_at)}</p>}
      {(i > 0) && (new Date(msg.created_at).toDateString() !== new Date(props.messages[i-1].created_at).toDateString()) && (
        <p className="separator">{formatDate(msg.created_at)}</p>
      )}
      <Message content={msg.content} owner={msg.owner} created_at={msg.created_at} currentUser={props.currentUser} />
    </div>
  ))

  return (
    <div>
      <div id="messages">
        {messages}
      </div>
      <div>
        <MessageForm chatroom_id={props.chatroom_id} />
      </div>
    </div>
  )
}

ChatroomBoard.propTypes = {
  messages: PropTypes.array,
  chatroom_id: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired
}

export default ChatroomBoard
