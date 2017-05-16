import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import SignupForm from './SignupForm'
import { userSignupRequest } from '../../actions/signupActions'
import { addFlashMessage } from '../../actions/flashMessages'

class SignupPage extends React.Component {

  render() {
    console.log("SingupPage render")
    const { userSignupRequest, addFlashMessage } = this.props
    return (
      <div>
        <h1>Signup Page</h1>
        <SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage} />
      </div>
    )
  }
}
SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest, addFlashMessage })(SignupPage)
