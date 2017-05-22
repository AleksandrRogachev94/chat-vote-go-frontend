import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { addMessage } from '../../actions/messagesActions'
import SuggestionFormType from './SuggestionFormType'
import PrimaryButton from '../common/PrimaryButton'
import InputField from '../common/InputField'

class SuggestionForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isCustom: true,
      title: '',
      description: ''
    }

    this.handleChangeFormType = this.handleChangeFormType.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeFormType() {
    this.setState((prevState, props) => ({
      isCustom: !prevState.isCustom
    }))
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  handleSubmit(ev) {
    ev.preventDefault()
    this.setState({
      title: '',
      description: ''
    })
    // this.props.addMessage(this.state)
  }

  render() {
    const { title, description, isCustom } = this.state
    let inputs = null
    if(isCustom) {
      inputs = (
        <div>
          <InputField name="title" label="Title" placeholder="Title" type="text" value={title}
            onChange={this.handleChange} />

          <div className="field">
            <label className="label">Description</label>
            <p className="control">
              <textarea className="textarea" name="description" placeholder="Add Description" value={description} onChange={this.handleChange} />
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className="content">
        <h4 className="title is-4">Create New Suggestion</h4>
        <SuggestionFormType isCustom={isCustom} handleChangeType={this.handleChangeFormType} />

        <form onSubmit={this.handleSubmit}>
          {inputs}

          <PrimaryButton value="Create Suggestion" disabled={!title} />
        </form>
      </div>
    )
  }
}

SuggestionForm.propTypes = {
  chatroom_id: PropTypes.string.isRequired,
  // addMessage: PropTypes.func.isRequired
}

const mapStateToProps = (_, ownProps) => ({
  chatroom_id: ownProps.chatroom_id
})

export default connect(mapStateToProps, { })(SuggestionForm)
