import React from 'react'
import UsersListContainer from './UsersListContainer'
import ProfileContainer from './ProfileContainer'

const UsersPage = (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3 sidebar">
          <UsersListContainer />
        </div>
        <div className="col-sm-9 right-side">
          <ProfileContainer />
        </div>
      </div>
    </div>
  )
}

export default UsersPage
