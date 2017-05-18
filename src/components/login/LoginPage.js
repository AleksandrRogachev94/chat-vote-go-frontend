import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../../actions/authActions'
import { addFlashMessage } from '../../actions/flashMessages'
import LoginForm from './LoginForm'

const LoginPage = ({ login, addFlashMessage }) => {
  console.log("LoginPage render")

  return (
    <div>
      <h1 className="title has-text-centered">Login Page</h1>

      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <LoginForm login={login} addFlashMessage={addFlashMessage} />
        </div>
      </div>
    </div>
  )
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

export default connect(null, { login, addFlashMessage })(LoginPage)
