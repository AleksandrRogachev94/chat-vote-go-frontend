import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import SignupForm from './SignupForm'
import { userSignupRequest } from '../../actions/signupActions'
import { addFlashMessage } from '../../actions/flashMessages'

const SignupPage = ({ userSignupRequest, addFlashMessage }) => {
  return (
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3 signup">
          <h1 className="title has-text-centered">Signup Page</h1>
          <SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage} />
        </div>
      </div>
  )
}

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest, addFlashMessage })(SignupPage)
