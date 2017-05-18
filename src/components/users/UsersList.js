import React from 'react'
import PropTypes from 'prop-types'
import User from './User'
import Error from '../common/Error'

const UsersList = ({ users, errors, isFetching }) => {
  console.log("UsersList render")

  const usersUl = users.map(user => <User key={user.id} nickname={user.nickname} id={user.id} avatar_url={user.avatar_url} />)

  return (
    <div>
    {errors.other && <Error msg={errors.other.join(", ")} />}
    {errors.auth && <Error msg={errors.auth.join(", ")} />}
      <aside className="menu">
        <p className="menu-label">Users</p>
        <ul className="menu-list">{usersUl}</ul>
      </aside>
      {isFetching && (<p>Loading...</p>)}
    </div>
  )
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errors: PropTypes.object
}

export default UsersList
