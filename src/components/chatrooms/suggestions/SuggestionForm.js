import React from 'react'
import PropTypes from 'prop-types'
import SuggestionFormType from './SuggestionFormType'
import SuggestionCustomForm from './SuggestionCustomForm'
import SuggestionGoogleForm from './SuggestionGoogleForm'

class SuggestionForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isCustom: false,
      title: '',
      description: '',
      place_id_google: ''
    }

    this.handleChangeFormType = this.handleChangeFormType.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmitGoogle = this.handleSubmitGoogle.bind(this)
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

  handleSubmitGoogle(place_id_google, title, ev) {
    this.setState({
      title,
      place_id_google
    }, () => this.handleSubmit(ev))
  }

  handleSubmit(ev) {
    ev.preventDefault()
    const { title, description, place_id_google } = this.state
    this.props.addSuggestion({
      title,
      description,
      place_id_google
    })

    this.setState({
      title: '',
      description: '',
      place_id_google: ''
    })
  }

  render() {
    const { title, description, isCustom } = this.state

    return (
      <div className="content">
        <h4 className="title is-4">Create New Suggestion</h4>
        <SuggestionFormType isCustom={isCustom} handleChangeType={this.handleChangeFormType} />

        {isCustom ? (
          <SuggestionCustomForm title={title} description={description} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
        ) : (
          <SuggestionGoogleForm chatroom_id={this.props.chatroom_id} handleSubmit={this.handleSubmitGoogle} />
        )}
      </div>
    )
  }
}

SuggestionForm.propTypes = {
  chatroom_id: PropTypes.string.isRequired,
  addSuggestion: PropTypes.func.isRequired
}

export default SuggestionForm
