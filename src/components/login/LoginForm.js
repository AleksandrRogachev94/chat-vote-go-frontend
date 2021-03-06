import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { dataFromReject, validateEmail, validatePassword } from '../../lib/shared'
import isEmpty from 'lodash/isEmpty'
import InputField from '../common/InputField'
import PrimaryButton from '../common/PrimaryButton'
import Error from '../common/Error'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      email: '',
      password: '',
      errors: {},
      isLoading: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(ev) {
    if(this.state.errors[ev.target.name]) {
      let errors = Object.assign({}, this.state.errors)
      delete errors[ev.target.name]
      this.setState({
        [ev.target.name]: ev.target.value,
        errors
      })
    } else {
      this.setState({ [ev.target.name]: ev.target.value })
    }
  }

  isValid() {
    const errors = {}
    validateEmail(this.state.email, errors)
    validatePassword(this.state.password, errors)

    if(!isEmpty(errors)) {
      this.setState({ errors })
    }

    return isEmpty(errors)
  }

  handleSubmit(ev) {
    ev.preventDefault()
    if(this.isValid()) {
      this.setState({ errors: {}, isLoading: true })
      this.props.login(this.state)
        .then(
          (response) => {
            this.props.addFlashMessage({ type: 'success', text: 'You logged in successfully. Welcome!' })
            browserHistory.push('/')
          },
          (fail) => this.setState(dataFromReject(fail, true))
        )
    }
  }

  render() {
    const { errors, isLoading, email, password } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        {errors.other &&  <Error msg={errors.other.join(", ")} />}
        {errors.auth &&  <Error msg={errors.auth.join(", ")} />}

        <InputField name="email" label="Email" placeholder="Email" type="email" value={email}
          onChange={this.handleChange} iconClass="glyphicon glyphicon-envelope" errors={errors.email && errors.email.join(", ")} />

        <InputField name="password" label="Password" placeholder="Password" type="password" value={password}
          onChange={this.handleChange} iconClass="glyphicon glyphicon-lock" errors={errors.password && errors.password.join(", ")} />

        <PrimaryButton value="Log In" isLoading={isLoading} />
      </form>
    )
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

export default LoginForm
