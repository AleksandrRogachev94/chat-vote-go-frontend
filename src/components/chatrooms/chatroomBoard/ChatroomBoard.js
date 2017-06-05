import React from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '../../../lib/shared'
import Message from './Message'
import MessageForm from './MessageForm'

class ChatroomBoard extends React.Component {

  componentDidMount() {
    let objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  componentDidUpdate() {
    let objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    let messages
    if(this.props.messages) messages = this.props.messages.map((msg, i) => (
      <div key={msg.id} >
        {i === 0 && <p className="separator">{formatDate(msg.created_at)}</p>}
        {(i > 0) && (new Date(msg.created_at).toDateString() !== new Date(this.props.messages[i-1].created_at).toDateString()) && (
          <p className="separator">{formatDate(msg.created_at)}</p>
        )}
        <Message content={msg.content} owner={msg.owner} created_at={msg.created_at} currentUser={this.props.currentUser} />
      </div>
    ))

    return (
      <div>
        <div id="messages">
          {messages}
        </div>
        <div>
          <MessageForm chatroom_id={this.props.chatroom_id} />
        </div>
      </div>
    )
  }
}

ChatroomBoard.propTypes = {
  messages: PropTypes.array,
  chatroom_id: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired
}

export default ChatroomBoard
