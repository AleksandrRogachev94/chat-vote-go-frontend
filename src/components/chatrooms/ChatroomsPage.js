import React from 'react'
import ChatroomsListContainer from './chatroomsList/ChatroomsListContainer'
import ChatroomContainer from './chatroomBoard/ChatroomContainer'
import SuggestionsContainer from './suggestions/SuggestionsContainer'

const ChatroomsPage = (props) => {
  console.log("ChatroomsPage render")

  return (
    <div>
      <div className="columns is-mobile">
        <div className="column is-3 page-column">
          <ChatroomsListContainer />
        </div>
        <div className="column page-column is-5">
          <ChatroomContainer />
        </div>
        <div className="column page-column is-4">
          <SuggestionsContainer />
        </div>
      </div>
    </div>
  )
}

export default ChatroomsPage
