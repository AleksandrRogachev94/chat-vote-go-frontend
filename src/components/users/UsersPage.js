import React from 'react'
import UsersListContainer from './UsersListContainer'
import ProfileContainer from './ProfileContainer'

const UsersPage = (props) => {
  console.log("UsersPage render")

  return (
    <div className="row">
      <div className="col-sm-9 col-sm-push-3 right-side">
        <ProfileContainer />
      </div>
      <div className="col-sm-3 col-sm-pull-9 sidebar">
        <UsersListContainer />
      </div>
    </div>
  )
}

export default UsersPage
