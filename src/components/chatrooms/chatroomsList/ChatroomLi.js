import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

const ChatroomLi = ({ title, id }) => {
  const handleClick = () => {
    document.body.scrollTop = document.body.scrollHeight
  }

  return (
    <li>
      <Link to={`/chatrooms/${id}`} onClick={handleClick} activeClassName='active-item'>
        {title}
      </Link>
    </li>
  )
}

ChatroomLi.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}

export default ChatroomLi
