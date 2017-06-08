import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

const User = ({ nickname, id, avatar_url }) => {
  const handleClick = () => {
    document.body.scrollTop = document.body.scrollHeight
  }

  return (
    <li>
      <Link to={`/users/${id}`} activeClassName='active-item' onClick={handleClick}>
        <div className="row">
          <div className="col-xs-4">
            <img src={avatar_url} alt="avatar" className="avatar-thumb" />
          </div>
          <div className="col-xs-8">
            <div style={{display: 'inline-block'}}>{nickname}</div>
          </div>
        </div>
      </Link>
    </li>
  )
}

User.propTypes = {
  nickname: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  avatar_url: PropTypes.string
}

export default User
