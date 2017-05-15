import React from 'react'
import PropTypes from 'prop-types';

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
    console.log("SignupForm render")
    const { errors } = this.state
    return (
      <form className="ui form" onSubmit={this.handleSubmit}>
        <div>{errors.other && <span>{errors.other.join(", ")}</span>}</div>

        <div className="field">
          <label className="label">Email</label>
          <p className="control has-icons-left">
            <input type="text" name="email" placeholder="Email" className={errors.email ? 'input is-danger' : 'input'}
              value={this.state.email} onChange={this.handleChange} />
            <span className="icon is-small is-left">
              <i className="fa fa-envelope"></i>
            </span>
          </p>
          {errors.email && <p className="help is-danger">{errors.email.join(", ")}</p>}
        </div>

        <div className="field">
          <label className="label">Password</label>
          <p className="control has-icons-left">
            <input type="password" name="password" placeholder="Password" className={errors.password ? 'input is-danger' : 'input'}
              value={this.state.password} onChange={this.handleChange} />
            <span className="icon is-small is-left">
              <i className="fa fa-lock"></i>
            </span>
          </p>
          {errors.password && <p className="help is-danger">{errors.password.join(", ")}</p>}
        </div>

        <div className="field">
          <label className="label">Password Confirmation</label>
          <p className="control has-icons-left">
            <input type="password" name="password_confirmation" placeholder="Confirm Password" className={errors.password_confirmation ? 'input is-danger' : 'input'}
              value={this.state.password_confirmation} onChange={this.handleChange} />
            <span className="icon is-small is-left">
              <i className="fa fa-lock"></i>
            </span>
          </p>
          {errors.password_confirmation && <p className="help is-danger">{errors.password_confirmation.join(", ")}</p>}
        </div>

        <button className="button is-primary" type="submit">Sign Up</button>
      </form>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
}

export default SignupForm
