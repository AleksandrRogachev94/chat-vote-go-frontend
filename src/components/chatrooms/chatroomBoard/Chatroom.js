import React from 'react'
import PropTypes from 'prop-types'
import ChatroomBoard from './ChatroomBoard'
import ChatroomUsers from './ChatroomUsers'

const Chatroom = ({ messages, owner, guests, id, currentUser, handleRemoveUser }) => {
  console.log("Chatroom render")

  return (
    <div>
      <ChatroomUsers owner={owner} guests={guests} currentUser={currentUser} handleRemove={handleRemoveUser} />
      <ChatroomBoard messages={messages} chatroom_id={id} currentUser={currentUser} />
    </div>
  )
}

Chatroom.PropTypes = {
  messages: PropTypes.array.isRequired,
  owner: PropTypes.object.isRequired,
  guests: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired,
  handleRemoveUser: PropTypes.func.isRequired
}

export default Chatroom
