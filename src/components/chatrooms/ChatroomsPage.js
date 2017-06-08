import React from 'react'
import ChatroomElementsContainer from './ChatroomElementsContainer'
import ChatroomsListContainer from './chatroomsList/ChatroomsListContainer'

const ChatroomsPage = (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3 sidebar">
          <ChatroomsListContainer />
        </div>
        <div className="col-sm-9 right-side">
          <ChatroomElementsContainer />
        </div>
      </div>
    </div>
  )
}

export default ChatroomsPage
