import React from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/index'

class LoginPage extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      email: 'test2@gmail.com',
      password: '12345',
      errors: []
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(ev) {
    ev.preventDefault()
    this.props.login(this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <button>Login</button>
      </form>
    )
  }
}

LoginPage = connect(null, { login })(LoginPage)
export default LoginPage
