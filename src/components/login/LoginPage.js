import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../../actions/login'
import LoginForm from './LoginForm'
import { addFlashMessage } from '../../actions/flashMessages'

const LoginPage = ({ login, addFlashMessage }) => {

  return (
    <div>
      <h1 className="title">Login Page</h1>
      <LoginForm login={login} addFlashMessage={addFlashMessage} />
    </div>
  )
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

export default connect(null, { login, addFlashMessage })(LoginPage)
