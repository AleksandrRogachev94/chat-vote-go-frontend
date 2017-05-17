import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import isEmpty from 'lodash/isEmpty';
import { fetchProfileIfNeeded, invalidateProfile } from '../../actions/profileActions'
import { getProfileByUserId } from '../../reducers/index'
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
    if(!this.state.profile) {
      this.fetchProfileIfNeeded()
    }
  }

  componentDidUpdate(prevProps) {
    // if(!this.state.profile) {
    // if(!this.props.profile || !prevProps.profile || (this.props.profile.profile.id !== prevProps.profile.profile.id)) {
      // this.fetchProfileIfNeeded()
    // }
  }

  fetchProfileIfNeeded() {
    this.props.fetchProfileIfNeeded(this.props.id)
      .then(() => { if(!isEmpty(this.state.errors)) this.setState({ errors: {} }) })
      .catch((fail) => { console.log("Setting state for errors........."); this.setState(dataFromReject(fail)) })
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
        <ProfilePage profile={this.props.profile && this.props.profile.profile}
                              errors={this.state.errors}
                              onRefresh={this.handleRefreshClick}
                              isLoading={this.props.profile && this.props.profile.isFetching} />
      </div>
    )
  }
}

const mapStateToProps = (state, { params }) => ({
  profile: getProfileByUserId(state, params.id),
  id: params.id
})

export default withRouter(connect(mapStateToProps, { fetchProfileIfNeeded, invalidateProfile })(ProfilePageContainer))
