import React from 'react'
import PropTypes from 'prop-types'
import Message from './Message'

const ChatroomBoard = (props) => {

  let messages
  if(props.messages) messages = props.messages.map(msg => (
    <Message key={msg.id} content={msg.content} owner={msg.owner.nickname} />
  ))

  return (
    <div id="chatroom-board">
      {messages}
    </div>
  )
}

ChatroomBoard.propTypes = {
  messages: PropTypes.array
}

export default ChatroomBoard
