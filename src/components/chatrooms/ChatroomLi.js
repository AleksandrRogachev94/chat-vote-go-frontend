import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

const ChatroomLi = ({ title, id }) => {
  return (
    <li>
      <Link to={`/chatrooms/${id}`} activeClassName='is-active'>
        {title}
      </Link>
    </li>
  )
}

ChatroomLi.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
}

export default ChatroomLi
