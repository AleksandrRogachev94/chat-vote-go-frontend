import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import InputField from '../common/InputField'
import AuthButton from '../common/AuthButton'
import { dataFromReject, validateEmail, validatePassword, validatePasswordConfirmation } from '../../lib/shared'
import isEmpty from 'lodash/isEmpty';
import Error from '../common/Error'

class SignupForm extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      email: '',
      password: '',
      password_confirmation: '',
      errors: {},
      isLoading: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  isValid() {
    const errors = {}
    validateEmail(this.state.email, errors)
    validatePassword(this.state.password, errors)
    validatePasswordConfirmation(this.state.password_confirmation, this.state.password, errors)

    if(!isEmpty(errors)) {
      this.setState({ errors })
    }

    return isEmpty(errors)
  }

  handleSubmit(ev) {
    ev.preventDefault()
    if(this.isValid()) {
      this.setState({ errors: {}, isLoading: true })
      this.props.userSignupRequest(this.state)
        .then(
          (response) => {
            this.props.addFlashMessage({ type: 'success', text: 'You signed up successfully. Welcome!' })
            browserHistory.push('/') },
          (fail) => { this.setState(dataFromReject(fail)) }
        )
    }
  }

  render() {
    console.log("SignupForm render")
    const { errors, isLoading, email, password, password_confirmation } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        {errors.other &&  <Error msg={errors.other.join(", ")} />}

        <InputField name="email" label="Email" placeholder="Email" type="email" value={email}
          onChange={this.handleChange} iconClass="fa fa-envelope" errors={errors.email && errors.email.join(", ")} />

        <InputField name="password" label="Password" placeholder="Password" type="password" value={password}
          onChange={this.handleChange} iconClass="fa fa-lock" errors={errors.password && errors.password.join(", ")} />

        <InputField name="password_confirmation" label="Confirm Password" placeholder="Password Confirmation"
          type="password" value={password_confirmation} onChange={this.handleChange} iconClass="fa fa-lock"
          errors={errors.password_confirmation && errors.password_confirmation.join(", ")} />

        <AuthButton value="Sign Up" isLoading={isLoading} />
      </form>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

export default SignupForm
