import React from 'react'
import ChatroomsListContainer from './ChatroomsListContainer'
import ChatroomContainer from './ChatroomContainer'

const ChatroomsPage = (props) => {
  console.log("ChatroomsPage render")

  return (
    <div>
      <h1 className="title has-text-centered">Chatrooms Page</h1>
      <div className="columns is-mobile">
        <div className="column is-one-third" id="users-list">
          <ChatroomsListContainer />
        </div>
        <div className="column">
          <ChatroomContainer />
        </div>
      </div>
    </div>
  )
}

export default ChatroomsPage
