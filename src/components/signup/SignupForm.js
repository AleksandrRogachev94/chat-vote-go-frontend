import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import InputField from '../common/InputField'
import PrimaryButton from '../common/PrimaryButton'
import { dataFromReject, validateEmail, validateNickname, validatePassword, validatePasswordConfirmation } from '../../lib/shared'
import isEmpty from 'lodash/isEmpty';
import Error from '../common/Error'

class SignupForm extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      email: '',
      nickname: '',
      first_name: '',
      last_name: '',
      avatar: '',
      avatarPreviewUrl: '',
      password: '',
      password_confirmation: '',
      errors: {},
      isLoading: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleAvatarChange = this.handleAvatarChange.bind(this)
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

  handleAvatarChange(ev) {
    ev.preventDefault();

    this.setState({ isLoading: true })
    let reader = new FileReader();
    let avatar = ev.target.files[0];

    reader.onloadend = (ev) => {
      this.setState({
        avatar: ev.target.result,
        isLoading: false,
        avatarPreviewUrl: reader.result
      });
  }

  reader.readAsDataURL(avatar)
}

  isValid() {
    const errors = {}
    validateEmail(this.state.email, errors)
    validateNickname(this.state.nickname, errors)
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
          (fail) => this.setState(dataFromReject(fail, true))
        )
    }
  }

  render() {
    console.log("SignupForm render")
    const { errors, isLoading, email, nickname, avatarPreviewUrl, first_name, last_name, password, password_confirmation } = this.state

    let avatarPreview
    if (avatarPreviewUrl) {
      avatarPreview = (<img id="avatar" src={avatarPreviewUrl} alt="avatar" />);
    } else {
      avatarPreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <form onSubmit={this.handleSubmit} encType="multipart/form-data">
        {errors.other &&  <Error msg={errors.other.join(", ")} />}

        <InputField name="email" label="Email*" placeholder="Email" type="email" value={email}
          onChange={this.handleChange} iconClass="fa fa-envelope" errors={errors.email && errors.email.join(", ")} />

        <InputField name="nickname" label="Nickname*" placeholder="Nickname" type="text" value={nickname}
          onChange={this.handleChange} errors={errors.nickname && errors.nickname.join(", ")} />

        <InputField name="first_name" label="First name" placeholder="First name" type="text" value={first_name}
          onChange={this.handleChange} errors={errors.first_name && errors.first_name.join(", ")} />

        <InputField name="last_name" label="Last name" placeholder="Last name" type="text" value={last_name}
          onChange={this.handleChange} errors={errors.last_name && errors.last_name.join(", ")} />

        <div className="field">
          <label className="label">Avatar</label>
          <input type="file" onChange={this.handleAvatarChange} />
          {avatarPreview}
          {errors.avatar && <p className="help is-danger">{errors.avatar.join(", ")}</p>}
        </div>

        <InputField name="password" label="Password*" placeholder="Password" type="password" value={password}
          onChange={this.handleChange} iconClass="fa fa-lock" errors={errors.password && errors.password.join(", ")} />

        <InputField name="password_confirmation" label="Confirm Password*" placeholder="Password Confirmation"
          type="password" value={password_confirmation} onChange={this.handleChange} iconClass="fa fa-lock"
          errors={errors.password_confirmation && errors.password_confirmation.join(", ")} />

        <PrimaryButton value="Sign Up" isLoading={isLoading} />
      </form>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

export default SignupForm
