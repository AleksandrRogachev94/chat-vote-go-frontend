import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../../actions/authActions'
import { addFlashMessage } from '../../actions/flashMessages'
import LoginForm from './LoginForm'

const LoginPage = ({ login, addFlashMessage }) => {
  return (
    <div className="row">
      <div className="col-sm-6 col-sm-offset-3">
        <h1>Login Page</h1>
        <LoginForm login={login} addFlashMessage={addFlashMessage} />
      </div>
    </div>
  )
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

export default connect(null, { login, addFlashMessage })(LoginPage)
