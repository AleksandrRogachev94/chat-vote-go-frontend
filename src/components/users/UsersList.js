import React from 'react'
import PropTypes from 'prop-types'
import User from './User'

const UsersList = ({ users }) => {
  console.log("UsersList render")

  const usersJSX = users.map(user => <User key={user.id} nickname={user.nickname} id={user.id} avatar_url={user.avatar_thumb_url} />)

  return (
    <aside className="list-menu">
      <p className="list-menu-label">Users</p>
      <ul className="list-menu-list">{usersJSX}</ul>
    </aside>
  )
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
}

export default UsersList
