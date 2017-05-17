import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import SignupForm from './SignupForm'
import { userSignupRequest } from '../../actions/signupActions'
import { addFlashMessage } from '../../actions/flashMessages'

const SignupPage = ({ userSignupRequest, addFlashMessage }) => {
  console.log("SingupPage render")
  return (
    <div>
      <h1 className="title has-text-centered">Signup Page</h1>
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage} />
        </div>
      </div>
    </div>
  )
}

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest, addFlashMessage })(SignupPage)
