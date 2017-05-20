import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types';
import { fetchUserProfileIfNeeded, invalidateUser } from '../../actions/userActions'
import { getUser, getIsFetchingUser, getUserErrors, getAllChatrooms } from '../../reducers/index'
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
    // if(id && (!user || !user.email))
    // if(!this.props.profile || !prevProps.profile || (this.props.profile.profile.id !== prevProps.profile.profile.id)) {
  }

  handleRefreshClick() {
    const { invalidateUser, fetchUserProfileIfNeeded, id } = this.props
    invalidateUser(id)
    fetchUserProfileIfNeeded(id)
  }

  render() {
    console.log("ProfileContainer render")

    const { profile, allChatrooms, errors, isFetching, id } = this.props
    return (
      <div>
        <Profile profile={profile} id={id} errors={errors} onRefresh={this.handleRefreshClick} isFetching={isFetching} allChatrooms={allChatrooms} />
      </div>
    )
  }
}

ProfileContainer.propTypes = {
  profile: PropTypes.object,
  allChatrooms: PropTypes.array.isRequired,
  isFetching: PropTypes.bool,
  errors: PropTypes.object,
  id: PropTypes.string,
  fetchUserProfileIfNeeded: PropTypes.func.isRequired,
  invalidateUser: PropTypes.func.isRequired
}

ProfileContainer.defaultProps = {
  errors: {}
}

const mapStateToProps = (state, { params }) => ({
  profile: getUser(state, params.id),
  allChatrooms: getAllChatrooms(state),
  isFetching: getIsFetchingUser(state, params.id),
  errors: getUserErrors(state, params.id),
  id: params.id
})

export default withRouter(connect(mapStateToProps, { fetchUserProfileIfNeeded, invalidateUser })(ProfileContainer))
