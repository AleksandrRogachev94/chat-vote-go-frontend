import React from 'react'
import PropTypes from 'prop-types'
import SuggestionFormType from './SuggestionFormType'
import SuggestionCustomForm from './SuggestionCustomForm'
import SuggestionGoogleForm from './SuggestionGoogleForm'

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
    const { isCustom, title, description } = this.state

    if(isCustom) {
      this.props.addSuggestion({
        title,
        description
      })
    }

    this.setState({
      title: '',
      description: ''
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
          <SuggestionGoogleForm />
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
