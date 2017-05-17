import React from 'react'
import PropTypes from 'prop-types';
import ProfileInfo from './ProfileInfo'
import Error from '../common/Error'
import PrimaryButton from '../common/PrimaryButton'

const ProfilePage = (props) => {
  console.log("ProfilePage render")

  let email, created_at
  if(props.profile) ({ email, created_at } = props.profile)

  return (
    <div>
      <h1 className="title has-text-centered">Profile Page</h1>
      {props.errors.other &&  <Error msg={props.errors.other.join(", ")} />}
      {props.errors.auth &&  <Error msg={props.errors.auth.join(", ")} />}

      <ProfileInfo email={email} created_at={created_at} />
      <PrimaryButton value="Refresh" onClick={props.onRefresh} isLoading={props.isFetching} />
    </div>
  )
}

ProfilePage.propTypes = {
  profile: PropTypes.object,
  errors: PropTypes.object,
  isFetching: PropTypes.bool,
  onRefresh: PropTypes.func.isRequired
}

export default ProfilePage
