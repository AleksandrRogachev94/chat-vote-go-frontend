import React from 'react'
import PropTypes from 'prop-types';
import ProfileInfo from './ProfileInfo'
import UpdateProfileModal from './UpdateProfileModal'
import Error from '../common/Error'
import PrimaryButton from '../common/PrimaryButton'

class Profile extends React.Component {

  openModal(ev) {
    ev.preventDefault()
    window.jQuery('#modal-update-profile').modal('show')
  }

  closeModal() {
    window.jQuery('#modal-update-profile').modal('hide')
  }

  render() {
    let email, avatar_original_url, nickname, first_name, last_name, created_at
    if(this.props.profile) ({ email, avatar_original_url, nickname, first_name, last_name, created_at } = this.props.profile)
    const { currentUser, id, errors, isFetching, onRefresh, profile, profileUpdateRequest, addFlashMessage } = this.props

    if(id) {
      return (
        <div className="profile">
          {errors.other && <Error msg={errors.other.join(", ")} />}
          {errors.auth && <Error msg={errors.auth.join(", ")} />}

          <ProfileInfo email={email} avatar_url={avatar_original_url} nickname={nickname} created_at={created_at} first_name={first_name} last_name={last_name} />
          {(currentUser.id === parseInt(id, 10)) && (<a href="#" onClick={this.openModal}>Update Profile</a>)}
          <PrimaryButton value="Refresh" onClick={onRefresh} isLoading={isFetching} />
          {profile && (currentUser.id === parseInt(id, 10)) && (
            <UpdateProfileModal onClose={this.closeModal} profileUpdateRequest={profileUpdateRequest}
            addFlashMessage={addFlashMessage} profile={profile} onRefresh={onRefresh} />
          )}
        </div>
      )
    } else {
      return (<h1 className="title has-text-centered">Choose User</h1>)
    }
  }
}

Profile.propTypes = {
  profile: PropTypes.object,
  id: PropTypes.string,
  currentUser: PropTypes.object.isRequired,
  errors: PropTypes.object,
  isFetching: PropTypes.bool,
  onRefresh: PropTypes.func.isRequired,
  profileUpdateRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

export default Profile
