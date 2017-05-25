import React from 'react'
import PropTypes from 'prop-types';
import { formatDate } from '../../lib/shared'

const ProfileInfo = ({ email, avatar_url, nickname, first_name, last_name, created_at }) => {
  console.log("ProfileInfo render")

  return (
    <div className="content has-text-centered">
      <img src={avatar_url} alt="avatar" id="avatar" />
      <h1 className="title">{nickname}</h1>

      <table className="table">
        <tbody>
          {email && (
            <tr>
              <th>Email</th>
              <th>{email}</th>
            </tr>
          )}
          {first_name && (
            <tr>
              <th>First name</th>
              <th>{first_name}</th>
            </tr>
          )}
          {last_name && (
            <tr>
              <th>Last name</th>
              <th>{last_name}</th>
            </tr>
          )}
          {created_at && (
            <tr>
              <th>Registered</th>
              <th>{formatDate(created_at)}</th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

ProfileInfo.propTypes = {
  nickname: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  avatar_url: PropTypes.string,
  created_at: PropTypes.number,
  email: PropTypes.string,
}

export default ProfileInfo
