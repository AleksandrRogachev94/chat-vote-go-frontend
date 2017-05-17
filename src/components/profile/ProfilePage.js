import React from 'react'
import PropTypes from 'prop-types';
import ProfileInfo from './ProfileInfo'
import Error from '../common/Error'

const ProfilePage = (props) => {
  console.log("ProfilePage render")

  let email, created_at
  if(props.profile) ({ email, created_at } = props.profile)

  return (
    <div>
      <h1 className="title">Profile Page</h1>
      {props.errors.other &&  <Error msg={props.errors.other.join(", ")} />}
      {props.errors.auth &&  <Error msg={props.errors.auth.join(", ")} />}
      <button className="button" onClick={props.onRefresh}>Refresh</button>
      <ProfileInfo email={email} created_at={created_at} />
    </div>
  )
}

ProfilePage.propTypes = {
  profile: PropTypes.object,
  errors: PropTypes.object,
  onRefresh: PropTypes.func.isRequired
}

export default ProfilePage
