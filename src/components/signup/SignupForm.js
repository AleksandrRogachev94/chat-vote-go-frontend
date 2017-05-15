import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames'

class SignupForm extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      email: '',
      password: '',
      password_confirmation: '',
      errors: {}
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
    this.setState({ errors: {} })
    this.props.userSignupRequest(this.state)
      .then(
        (response) => {  },
        (fail) => { this.handleReject(fail) }
      )
  }

  handleReject(fail) {
    if(Math.floor(fail.status / 100) === 4) {
      this.setState({ errors: fail.data.errors })
    } else {
      this.setState({ errors: { other: ["Error occured"] } })
    }
  }

  render() {
    const { errors } = this.state
    console.log(errors)
    return (
      <form onSubmit={this.handleSubmit}>
        <div>{errors.other && <span>{errors.other.join(", ")}</span>}</div>

        <div className={classnames("form-group", { 'has-errors': errors.email })}>
          <label>Email
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
          </label>
          {errors.email && <span>{errors.email.join(", ")}</span>}
        </div>

        <div>
          <label>Password
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
          </label>
          {errors.password && <span>{errors.password.join(", ")}</span>}
        </div>

        <div>
          <label>Password Confirmation
            <input type="password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange} />
          </label>
          {errors.password_confirmation && <span>{errors.password_confirmation.join(", ")}</span>}
        </div>
        <button>Sign Up</button>
      </form>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
}

export default SignupForm
