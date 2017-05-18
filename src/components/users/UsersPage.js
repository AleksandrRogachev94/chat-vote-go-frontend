import React from 'react'
import UsersListContainer from './UsersListContainer'
import ProfileContainer from './ProfileContainer'

const UsersPage = (props) => {
  console.log("UsersPage render")

  return (
    <div>
      <h1 className="title has-text-centered">Users Page</h1>
      <div className="columns">
        <div className="column is-one-third" id="users-list">
          <UsersListContainer />
        </div>
        <div className="column">
          <ProfileContainer />
        </div>
      </div>
    </div>
  )
}

export default UsersPage
