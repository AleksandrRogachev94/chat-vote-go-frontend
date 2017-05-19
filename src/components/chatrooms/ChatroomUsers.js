import React from 'react'
import PropTypes from 'prop-types'

const ChatroomUsers = (props) => {
  return (
    <p>Chatroom Users</p>
  )
}

ChatroomUsers.propTypes = {
  owner: PropTypes.object,
  guests: PropTypes.array
}

export default ChatroomUsers
