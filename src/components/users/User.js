import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

const User = ({ nickname, id, avatar_url }) => {
  return (
    <li>
      <Link to={`/users/${id}`} activeClassName='is-active'>
        <div className="columns is-mobile">
          <div className="column is-one-third">
            <img src={avatar_url} alt="avatar" id="avatar-thumb" />
          </div>
          <div className="column">
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
