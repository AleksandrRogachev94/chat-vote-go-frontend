import React from 'react'
import PropTypes from 'prop-types';

class SignupForm extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      email: '',
      password: '',
      password_confirmation: '',
      errors: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  handleSubmit(ev) {
    ev.preventDefault()
    this.props.userSignupRequest(this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Email
          <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
        </label>
        <label>Password
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
        </label>
        <label>Password Confirmation
          <input type="password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange} />
        </label>
        <button>Sign Up</button>
      </form>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
}

export default SignupForm
