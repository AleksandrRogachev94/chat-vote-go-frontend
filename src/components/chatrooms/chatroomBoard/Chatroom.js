import React from 'react'
import PropTypes from 'prop-types'
import ChatroomBoard from './ChatroomBoard'
import ChatroomUsers from './ChatroomUsers'
import Error from '../../common/Error'

const Chatroom = (props) => {
  console.log("Chatroom render")

  let title, messages, owner, guests
  if(props.chatroom) ({ title, messages, owner, guests } = props.chatroom)

  if(!props.id) {
    return (<h1 className="title has-text-centered">Choose Chatroom</h1>)
  } else {
    return (
      <div>
        <h1 className="title has-text-centered">{title}</h1>
        {props.errors.other && <Error msg={props.errors.other.join(", ")} />}
        {props.errors.auth && <Error msg={props.errors.auth.join(", ")} />}
        <ChatroomUsers owner={owner} guests={guests} />
        <ChatroomBoard messages={messages} chatroom_id={props.id} />
      </div>
    )
  }
}

Chatroom.PropTypes = {
  chatroom: PropTypes.object,
  id: PropTypes.string,
  errors: PropTypes.object,
  isFetching: PropTypes.bool
}

export default Chatroom
