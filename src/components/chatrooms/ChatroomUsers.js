import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

const ChatroomUsers = (props) => {

  let owner, guests

  if(props.owner) owner = <Link to={`/users/${props.owner.id}`}>{props.owner.nickname}</Link>
  if(props.guests) guests = props.guests.map((guest) =>(
    <li key={guest.id}><Link to={`/users/${guest.id}`}>{guest.nickname}</Link></li>
  ))

  return (
    <div>
      <h3 className="title is-3">Chatroom Users</h3>
      <div>Owner: {owner}</div>
      <div>Guests:
        <ul>{guests}</ul>
      </div>
    </div>
  )
}

ChatroomUsers.propTypes = {
  owner: PropTypes.object,
  guests: PropTypes.array
}

export default ChatroomUsers
