import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

const ChatroomUsers = (props) => {

  let owner, guests

  if(props.owner) owner = <Link to={`/users/${props.owner.id}`}>{props.owner.nickname}</Link>
  if(props.guests) guests = props.guests.map((guest) =>(
    <Link key={guest.id} to={`/users/${guest.id}`}>{guest.nickname} </Link>
  ))

  return (
    <div>
      <table className="table">
        <tbody>
            <tr>
              <th>Owner</th>
              <th>{owner}</th>
            </tr>
            <tr>
              <th>Guests</th>
              <th>{guests}</th>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

ChatroomUsers.propTypes = {
  owner: PropTypes.object,
  guests: PropTypes.array
}

export default ChatroomUsers
