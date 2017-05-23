import React from 'react'
import ChatroomsListContainer from './ChatroomsListContainer'
import ChatroomContainer from './ChatroomContainer'
import SuggestionsContainer from './SuggestionsContainer'

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
