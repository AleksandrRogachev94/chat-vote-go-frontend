import React from 'react'
import PropTypes from 'prop-types'
import InputField from '../common/InputField'
import deepEqual from 'deep-equal'
import isEmpty from 'lodash/isEmpty'
import { dataFromReject, validateEmail, validateNickname } from '../../lib/shared'

class UpdateProfileModal extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      nickname: '',
      first_name: '',
      last_name: '',
      avatar: '',
      avatarPreviewUrl: '',
      errors: {},
      isLoading: false
    }

    this.handleAvatarChange = this.handleAvatarChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate(prevProps) {
    if(!deepEqual(prevProps.profile, this.props.profile)) {
      this.setState({
        email: this.props.profile.email,
        nickname: this.props.profile.nickname,
        first_name: this.props.profile.first_name,
        last_name: this.props.profile.last_name
      })
    }
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

    if(!isEmpty(errors)) {
      this.setState({ errors })
    }

    return isEmpty(errors)
  }

  handleSubmit(ev) {
    ev.preventDefault()

    if(this.isValid()) {
      this.setState({ errors: {}, isLoading: true })
      this.props.profileUpdateRequest(this.state, this.props.profile.id)
        .then(
          (response) => {
            this.props.addFlashMessage({ type: 'success', text: 'Updated Profile Successfully' })
            this.setState({ isLoading: false })
            this.props.onRefresh()
            this.props.onClose()
          },
          (fail) => this.setState(dataFromReject(fail, true))
        )
    }
  }

  render() {
    const { onClose } = this.props
    const { errors, isLoading, email, nickname, avatarPreviewUrl, first_name, last_name } = this.state

    let avatarPreview
    if (avatarPreviewUrl) {
      avatarPreview = (<img id="avatar" src={avatarPreviewUrl} alt="avatar" />);
    } else {
      avatarPreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="modal fade" id="modal-update-profile" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">Update Profile</h4>
            </div>
            <div className="modal-body">
              <section className="modal-card-body">
                <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                  {errors.other &&  <Error msg={errors.other.join(", ")} />}

                  <InputField name="email" label="Email*" placeholder="Email" type="email" value={email}
                    onChange={this.handleChange} iconClass="glyphicon glyphicon-envelope" errors={errors.email && errors.email.join(", ")} />

                  <InputField name="nickname" label="Nickname*" placeholder="Nickname" type="text" value={nickname}
                    onChange={this.handleChange} iconClass="glyphicon glyphicon-user" errors={errors.nickname && errors.nickname.join(", ")} />

                  <InputField name="first_name" label="First name" placeholder="First name" type="text" value={first_name}
                    onChange={this.handleChange} errors={errors.first_name && errors.first_name.join(", ")} />

                  <InputField name="last_name" label="Last name" placeholder="Last name" type="text" value={last_name}
                    onChange={this.handleChange} errors={errors.last_name && errors.last_name.join(", ")} />

                  <div className={errors.avatar ? "form-group has-error" : "form-group"}>
                    <label className="label">Avatar</label>
                    <input type="file" onChange={this.handleAvatarChange} />
                    {avatarPreview}
                    {errors.avatar && <span className="help-block">{errors.avatar.join(", ")}</span>}
                  </div>
                </form>
              </section>
            </div>

            <div className="modal-footer">
              <button className="btn btn-success" onClick={this.handleSubmit} aria-label="Close" disabled={isLoading}>Update</button>
              <a className="btn btn-danger" onClick={onClose} aria-label="Close">Cancel</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

UpdateProfileModal.propTypes = {
  profile: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  profileUpdateRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired
}

export default UpdateProfileModal
