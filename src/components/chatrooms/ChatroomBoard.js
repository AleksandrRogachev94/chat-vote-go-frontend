import React from 'react'
import PropTypes from 'prop-types'
import Message from './Message'
import MessageForm from './MessageForm'

const ChatroomBoard = (props) => {

  let messages
  if(props.messages) messages = props.messages.map(msg => (
    <Message key={msg.id} content={msg.content} owner={msg.owner.nickname} created_at={msg.created_at} />
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
  chatroom_id: PropTypes.string.isRequired
}

export default ChatroomBoard
