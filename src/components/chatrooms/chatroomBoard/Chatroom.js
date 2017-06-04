import React from 'react'
import PropTypes from 'prop-types'
import ChatroomBoard from './ChatroomBoard'
import ChatroomUsers from './ChatroomUsers'

const Chatroom = ({ messages, owner, guests, id }) => {
  console.log("Chatroom render")

  return (
    <div>
      <ChatroomUsers owner={owner} guests={guests} />
      <ChatroomBoard messages={messages} chatroom_id={id} />
    </div>
  )
}

Chatroom.PropTypes = {
  messages: PropTypes.array.isRequired,
  owner: PropTypes.object.isRequired,
  guests: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
}

export default Chatroom
