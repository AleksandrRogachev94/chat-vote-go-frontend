import React from 'react'
import ChatroomElementsContainer from './ChatroomElementsContainer'
import ChatroomsListContainer from './chatroomsList/ChatroomsListContainer'

const ChatroomsPage = (props) => {
  console.log("ChatroomsPage render")

  return (
    <div className="row">
      <div className="col-sm-9 col-sm-push-3 right-side">
        <ChatroomElementsContainer />
      </div>
      <div className="col-sm-3 col-sm-pull-9 sidebar">
        <ChatroomsListContainer />
      </div>
    </div>
  )
}

export default ChatroomsPage
