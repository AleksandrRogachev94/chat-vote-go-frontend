import React from 'react'
import ChatroomElementsContainer from './ChatroomElementsContainer'
import ChatroomsListContainer from './chatroomsList/ChatroomsListContainer'

const ChatroomsPage = (props) => {
  console.log("ChatroomsPage render")

  return (
    <div>
      <div className="columns is-mobile">
        <div className="column is-3 page-column">
          <ChatroomsListContainer />
        </div>
        <div className="column page-column">
          <ChatroomElementsContainer />
        </div>
      </div>
    </div>
  )
}

export default ChatroomsPage
