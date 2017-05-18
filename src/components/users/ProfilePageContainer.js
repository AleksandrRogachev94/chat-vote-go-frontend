import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types';
import { fetchProfileIfNeeded, invalidateProfile } from '../../actions/profileActions'
import { getProfile, getIsFetchingProfile, getProfileErrors } from '../../reducers/index'
import ProfilePage from './ProfilePage'

class ProfilePageContainer extends React.Component {

  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { profile, fetchProfileIfNeeded, id } = this.props
    if(!profile) {
      fetchProfileIfNeeded(id)
    }
  }

  componentDidUpdate(prevProps) {
    const { profile, fetchProfileIfNeeded, id } = this.props
    if(!profile) {
    // if(!this.props.profile || !prevProps.profile || (this.props.profile.profile.id !== prevProps.profile.profile.id)) {
      fetchProfileIfNeeded(id)
    }
  }

  handleRefreshClick() {
    const { invalidateProfile, fetchProfileIfNeeded, id } = this.props
    invalidateProfile(id)
    fetchProfileIfNeeded(id)
  }

  render() {
    console.log("ProfilePageContainer render")

    const { profile, errors, isFetching } = this.props
    return (
      <div>
        <ProfilePage profile={profile} errors={errors} onRefresh={this.handleRefreshClick} isFetching={isFetching} />
      </div>
    )
  }
}

ProfilePageContainer.propTypes = {
  profile: PropTypes.object,
  isFetching: PropTypes.bool,
  errors: PropTypes.object,
  id: PropTypes.string.isRequired
}

ProfilePageContainer.defaultProps = {
  errors: {}
}

const mapStateToProps = (state, { params }) => ({
  profile: getProfile(state, params.id),
  isFetching: getIsFetchingProfile(state, params.id),
  errors: getProfileErrors(state, params.id),
  id: params.id
})

export default withRouter(connect(mapStateToProps, { fetchProfileIfNeeded, invalidateProfile })(ProfilePageContainer))
