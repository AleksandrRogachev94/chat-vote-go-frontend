import React from 'react'
import PropTypes from 'prop-types';
import ProfileInfo from './ProfileInfo'
import AddToChatroom from './AddToChatroom'
import Error from '../common/Error'
import PrimaryButton from '../common/PrimaryButton'

const Profile = (props) => {
  console.log("Profile render")

  let email, avatar_original_url, nickname, first_name, last_name, created_at
  if(props.profile) ({ email, avatar_original_url, nickname, first_name, last_name, created_at } = props.profile)
  const { currentUser, id } = props

  if(props.id) {
    return (
      <div className="profile">
        {props.errors.other && <Error msg={props.errors.other.join(", ")} />}
        {props.errors.auth && <Error msg={props.errors.auth.join(", ")} />}

        <ProfileInfo email={email} avatar_url={avatar_original_url} nickname={nickname} created_at={created_at} first_name={first_name} last_name={last_name} />
        {(currentUser.id !== parseInt(id, 10)) && (<AddToChatroom />)}
        <PrimaryButton value="Refresh" onClick={props.onRefresh} isLoading={props.isFetching} />
      </div>
    )
  } else {
    return (<h1 className="title has-text-centered">Choose User</h1>)
  }
}

Profile.propTypes = {
  profile: PropTypes.object,
  id: PropTypes.string,
  currentUser: PropTypes.object.isRequired,
  errors: PropTypes.object,
  isFetching: PropTypes.bool,
  onRefresh: PropTypes.func.isRequired
}

export default Profile
