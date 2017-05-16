import React from 'react'
import PropTypes from 'prop-types';

const ProfileInfo = ({ email, created_at }) => {
  console.log("ProfileInfo render")
  return (
    <div>
      <h1 className="title">{email}</h1>
      <p>{created_at}</p>
    </div>
  )
}

ProfileInfo.propTypes = {
  email: PropTypes.string,
  created_at: PropTypes.string
}

export default ProfileInfo
