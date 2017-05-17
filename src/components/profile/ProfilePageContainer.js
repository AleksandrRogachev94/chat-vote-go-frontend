import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import ProfilePage from './ProfilePage'
import { fetchProfile } from '../../actions/profileActions'
import { dataFromReject } from '../../lib/shared'

class ProfilePageContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      errors: {}
    }

    this.fetchProfile = this.fetchProfile.bind(this)
  }

  componentDidMount() {
    this.fetchProfile()
  }

  fetchProfile() {
    this.props.fetchProfile(this.props.id)
      .then(() => this.setState({ errors: {} }))
      .catch((fail) => { this.setState(dataFromReject(fail)) })
  }

  render() {
    console.log("ProfilePageContainer render")
    const { profile } = this.props

    return (
      <div>
        <button className="button" onClick={this.fetchProfile}>Refresh</button>
        <ProfilePage profile={profile} errors={this.state.errors} />
      </div>
    )
  }
}

const getProfile = (profiles, id) =>
  profiles.find(profile => profile.id === parseInt(id, 10))

const mapStateToProps = (state, ownProps) => ({
  profile: getProfile(state.profiles, ownProps.params.id),
  id: ownProps.params.id
})

export default withRouter(connect(mapStateToProps, { fetchProfile })(ProfilePageContainer))
