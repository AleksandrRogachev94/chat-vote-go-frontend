import React from 'react'
import PropTypes from 'prop-types'
import ChatroomLi from './ChatroomLi'
import Error from '../../common/Error'
import ChatroomForm from './ChatroomForm'

const ChatroomsList = ({ own_chatrooms, guest_chatrooms, isFetching, errors }) => {
  console.log("ChatroomsList render")

  const ownJSX = own_chatrooms.map(chatroom =>
    <ChatroomLi key={chatroom.id} title={chatroom.title} id={chatroom.id} />)
  const guestJSX = guest_chatrooms.map(chatroom =>
    <ChatroomLi key={chatroom.id} title={chatroom.title} id={chatroom.id} />)

  return (
    <div>
      {errors.other && <Error msg={errors.other.join(", ")} />}
      {errors.auth && <Error msg={errors.auth.join(", ")} />}
      <ChatroomForm />
      <aside className="list-menu">
        <p className="list-menu-label">Your Own Chatrooms</p>
        <ul className="list-menu-list">{ownJSX}</ul>
        <p className="list-menu-label">Your Guest Chatrooms</p>
        <ul className="list-menu-list">{guestJSX}</ul>
      </aside>
      {isFetching && (<p>Loading...</p>)}
    </div>
  )
}

ChatroomsList.propTypes = {
  own_chatrooms: PropTypes.array.isRequired,
  guest_chatrooms: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errors: PropTypes.object
}

export default ChatroomsList
