import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

const ChatroomUsers = (props) => {

  let owner, guests

  if(props.owner) owner = <Link to={`/users/${props.owner.id}`}>{props.owner.nickname}</Link>
  if(props.guests) guests = props.guests.map((guest) =>(
    <div key={guest.id} className="chatUser">
      { props.owner && (props.owner.id === props.currentUser.id) && (
        <button type="button" className="close" onClick={props.handleRemove}>
          <span aria-hidden="true" data-user_id={guest.id}>&times;</span>
        </button>
      )}
      <Link to={`/users/${guest.id}`}>{guest.nickname} </Link>
    </div>
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
  guests: PropTypes.array,
  handleRemove: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
}

export default ChatroomUsers
