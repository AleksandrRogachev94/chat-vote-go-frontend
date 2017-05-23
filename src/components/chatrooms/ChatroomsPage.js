import React from 'react'
import ChatroomsListContainer from './ChatroomsListContainer'
import ChatroomContainer from './ChatroomContainer'
import SuggestionsContainer from './SuggestionsContainer'

const ChatroomsPage = (props) => {
  console.log("ChatroomsPage render")

  return (
    <div>
      <h1 className="title has-text-centered">Chatrooms Page</h1>
      <div className="columns is-mobile">
        <div className="column is-one-quarter" id="users-list">
          <ChatroomsListContainer />
        </div>
        <div className="column">
          <ChatroomContainer />
        </div>
        <div className="column">
          <SuggestionsContainer />
        </div>
      </div>
    </div>
  )
}

export default ChatroomsPage
