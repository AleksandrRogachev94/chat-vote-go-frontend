import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { fetchProfileIfNeeded, invalidateProfile } from '../../actions/profileActions'
import { getProfile, getIsFetchingProfile } from '../../reducers/index'
import { dataFromReject } from '../../lib/shared'
import ProfilePage from './ProfilePage'

class ProfilePageContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      errors: {},
    }

    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    if(!this.props.profile) {
      this.fetchProfileIfNeeded()
    }
  }

  componentDidUpdate(prevProps) {
    if(!this.props.profile) {
    // if(!this.props.profile || !prevProps.profile || (this.props.profile.profile.id !== prevProps.profile.profile.id)) {
      this.fetchProfileIfNeeded()
    }
  }

  fetchProfileIfNeeded() {
    this.props.fetchProfileIfNeeded(this.props.id)
      .then(() => { if(!isEmpty(this.state.errors)) this.setState({ errors: {} }) })
      .catch((fail) => this.setState(dataFromReject(fail)))
  }

  handleRefreshClick() {
    const { invalidateProfile, id } = this.props
    invalidateProfile(id)
    this.fetchProfileIfNeeded(id)
  }

  render() {
    console.log("ProfilePageContainer render")
    return (
      <div>
        <ProfilePage profile={this.props.profile}
                              errors={this.state.errors}
                              onRefresh={this.handleRefreshClick}
                              isFetching={this.props.isFetching} />
      </div>
    )
  }
}

ProfilePageContainer.propTypes = {
  profile: PropTypes.object,
  isFetching: PropTypes.bool,
  id: PropTypes.string.isRequired
}

const mapStateToProps = (state, { params }) => ({
  profile: getProfile(state, params.id),
  isFetching: getIsFetchingProfile(state, params.id),
  id: params.id
})

export default withRouter(connect(mapStateToProps, { fetchProfileIfNeeded, invalidateProfile })(ProfilePageContainer))
