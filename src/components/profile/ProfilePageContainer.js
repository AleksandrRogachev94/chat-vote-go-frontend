import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import ProfilePage from './ProfilePage'
import { fetchProfile } from '../../actions/profileActions'

class ProfilePageContainer extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    this.props.fetchProfile(this.props.id).then(res => console.log(res))
  }

  render() {
    const { profile, id } = this.props
    // const profile = {email: "Alex!", created_at: "2"}

    return (
      <ProfilePage profile={profile} />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  profile: state.profiles[ownProps.params.id],
  id: ownProps.params.id
})

export default withRouter(connect(mapStateToProps, { fetchProfile })(ProfilePageContainer))
