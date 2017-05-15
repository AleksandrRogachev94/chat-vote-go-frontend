import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import SignupForm from './SignupForm'
import { userSignupRequest } from '../../actions/signupActions'

class SignupPage extends React.Component {

  render() {
    const { userSignupRequest } = this.props
    return (
      <div>
        <h1>Signup Page</h1>
        <SignupForm userSignupRequest={userSignupRequest} />
      </div>
    )
  }
}
SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
}

export default connect(null, { userSignupRequest })(SignupPage)
