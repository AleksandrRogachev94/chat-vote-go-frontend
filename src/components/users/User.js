import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

const User = ({ email, id }) => {
  return (
    <li><Link to={`/users/${id}`} activeClassName='is-active'>{email}</Link></li>
  )
}

User.propTypes = {
  email: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}

export default User
