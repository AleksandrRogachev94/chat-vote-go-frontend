import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import isEmpty from 'lodash/isEmpty';
import { fetchProfileIfNeeded, invalidateProfile } from '../../actions/profileActions'
import { dataFromReject } from '../../lib/shared'
import ProfilePage from './ProfilePage'

class ProfilePageContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      errors: {},
    }

    this.fetchProfileIfNeeded = this.fetchProfileIfNeeded.bind(this)
  }

  componentDidMount() {
    this.fetchProfileIfNeeded()
  }

  fetchProfileIfNeeded() {
    this.props.fetchProfileIfNeeded(this.props.id)
      .then(() => { if(!isEmpty(this.state.errors)) this.setState({ errors: {} }) })
      .catch((fail) => this.setState(dataFromReject(fail)))
  }

  render() {
    console.log("ProfilePageContainer render")

    return (
      <div>
        <ProfilePage profile={this.props.profile && this.props.profile.profile} errors={this.state.errors} onRefresh={() => console.log("Refresh!!!")} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  profile: state.profilesByUserId[ownProps.params.id],
  id: ownProps.params.id
})

export default withRouter(connect(mapStateToProps, { fetchProfileIfNeeded, invalidateProfile })(ProfilePageContainer))
