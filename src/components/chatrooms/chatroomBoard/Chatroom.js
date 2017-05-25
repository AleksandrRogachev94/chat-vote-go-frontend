import React from 'react'
import PropTypes from 'prop-types'
import ChatroomBoard from './ChatroomBoard'
import ChatroomUsers from './ChatroomUsers'
import Error from '../../common/Error'

const Chatroom = (props) => {
  console.log("Chatroom render")

  const { messages, owner, guests } = props
  
  if(!props.id) {
    return (<h1 className="title has-text-centered">Choose Chatroom</h1>)
  } else {
    return (
      <div>
        {props.errors.other && <Error msg={props.errors.other.join(", ")} />}
        {props.errors.auth && <Error msg={props.errors.auth.join(", ")} />}
        <ChatroomUsers owner={owner} guests={guests} />
        <ChatroomBoard messages={messages} chatroom_id={props.id} />
      </div>
    )
  }
}

Chatroom.PropTypes = {
  messages: PropTypes.array,
  owner: PropTypes.object,
  guests: PropTypes.array,
  id: PropTypes.string,
  errors: PropTypes.object,
  isFetching: PropTypes.bool
}

export default Chatroom
