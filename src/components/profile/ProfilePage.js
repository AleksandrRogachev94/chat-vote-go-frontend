import React from 'react'
import PropTypes from 'prop-types';
import ProfileInfo from './ProfileInfo'

const ProfilePage = (props) => {
  console.log("ProfilePage render")
console.log(props)
  // const { email, created_at } = props.profile

  return (
    <p></p>
    // <ProfileInfo email={email} created_at={created_at} />
  )
}

ProfilePage.propTypes = {
  profile: PropTypes.object
}

export default ProfilePage
