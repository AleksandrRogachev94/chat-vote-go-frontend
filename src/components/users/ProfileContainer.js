import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types';
import { fetchUserProfileIfNeeded, invalidateUser, profileUpdateRequest } from '../../actions/userActions'
import { addFlashMessage } from '../../actions/flashMessages'
import { getUser, getIsFetchingUser, getUserErrors, getCurrentUser } from '../../reducers/index'
import Profile from './Profile'

class ProfileContainer extends React.Component {

  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { fetchUserProfileIfNeeded, id } = this.props
    if(id) {
      fetchUserProfileIfNeeded(id)
    }
  }

  componentDidUpdate(prevProps) {
    const { fetchUserProfileIfNeeded, id } = this.props
    if(id && prevProps.id !== id) {
      fetchUserProfileIfNeeded(id)
    }
  }

  handleRefreshClick() {
    const { invalidateUser, fetchUserProfileIfNeeded, id } = this.props
    invalidateUser(id)
    fetchUserProfileIfNeeded(id)
  }

  render() {
    const { profile, errors, isFetching, id, currentUser, profileUpdateRequest, addFlashMessage } = this.props
    return (
      <div>
        <Profile profile={profile} id={id} errors={errors} onRefresh={this.handleRefreshClick} isFetching={isFetching}
          currentUser={currentUser} profileUpdateRequest={profileUpdateRequest} addFlashMessage={addFlashMessage} />
      </div>
    )
  }
}

ProfileContainer.propTypes = {
  profile: PropTypes.object,
  isFetching: PropTypes.bool,
  errors: PropTypes.object,
  currentUser: PropTypes.object.isRequired,
  id: PropTypes.string,
  fetchUserProfileIfNeeded: PropTypes.func.isRequired,
  invalidateUser: PropTypes.func.isRequired,
  profileUpdateRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

ProfileContainer.defaultProps = {
  errors: {}
}

const mapStateToProps = (state, { params }) => ({
  profile: getUser(state, params.id),
  isFetching: getIsFetchingUser(state, params.id),
  errors: getUserErrors(state, params.id),
  currentUser: getCurrentUser(state),
  id: params.id
})

export default withRouter(
  connect(mapStateToProps, { fetchUserProfileIfNeeded, invalidateUser, profileUpdateRequest, addFlashMessage })(ProfileContainer)
)
