import React from 'react'
import PropTypes from 'prop-types';
import InputField from './InputField'
import AuthButton from './AuthButton'

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

  handleSubmit(ev) {
    ev.preventDefault()
    this.setState({ errors: {}, isLoading: true })
    this.props.userSignupRequest(this.state)
      .then(
        (response) => {  },
        (fail) => { this.handleReject(fail) }
      )
      .then(() => this.setState({isLoading: false}))
  }

  handleReject(fail) {
    if(Math.floor(fail.status / 100) === 4) {
      this.setState({ errors: fail.data.errors })
    } else {
      this.setState({ errors: { other: ["Error occured"] } })
    }
  }

  render() {
    console.log("SignupForm render")
    const { errors, isLoading } = this.state
    return (
      <form className="ui form" onSubmit={this.handleSubmit}>
        {errors.other && <p className="help is-danger">{errors.other.join(", ")}</p>}

        <InputField name="email" label="Email" placeholder="Email" type="email" value={this.state.email}
          onChange={this.handleChange} iconClass="fa fa-envelope" errors={errors.email && errors.email.join(", ")} />

        <InputField name="password" label="Password" placeholder="Password" type="password" value={this.state.password}
          onChange={this.handleChange} iconClass="fa fa-lock" errors={errors.password && errors.password.join(", ")} />

        <InputField name="password_confirmation" label="Confirm Password" placeholder="Password Confirmation"
          type="password" value={this.state.password_confirmation} onChange={this.handleChange} iconClass="fa fa-lock"
          errors={errors.password_confirmation && errors.password_confirmation.join(", ")} />

        <AuthButton value="Sign Up" isLoading={isLoading} />
      </form>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
}

export default SignupForm
