import React from 'react'
import PropTypes from 'prop-types'
import ChatroomBoard from './ChatroomBoard'

const Chatroom = ({ messages, id, currentUser }) => {
  return (
    <div>
      <ChatroomBoard messages={messages} chatroom_id={id} currentUser={currentUser} />
    </div>
  )
}

Chatroom.PropTypes = {
  messages: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired,
}

export default Chatroom
