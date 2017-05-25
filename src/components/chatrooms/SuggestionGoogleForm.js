import React from 'react'
import PropTypes from 'prop-types'
import SuggestionGoogleModal from './SuggestionGoogleModal'
import isEmpty from 'lodash/isEmpty'

class SuggestionGoogleForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpenModal: false,
      suggestion: {}
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const autocomplete = new window.google.maps.places.Autocomplete(document.getElementById("autocomplete"))
    autocomplete.addListener('place_changed', () => {
      var place = autocomplete.getPlace()
      this.setState({ isOpenModal: true, suggestion: place })
    })
  }

  handleClose() {
    this.setState({
      isOpenModal: false,
      suggestion: {}
    })
  }

  handleSubmit(ev) {
    ev.persist()
    this.props.handleSubmit(this.state.suggestion.place_id, this.state.suggestion.name, ev)
    this.handleClose()
  }

  render() {
    return (
      <div>
        <p className="control">
          <input className="input" type="text" id="autocomplete" />
        </p>
        { !isEmpty(this.state.suggestion) && (
          <SuggestionGoogleModal place_id={this.state.suggestion.place_id} isOpen={this.state.isOpenModal}
            onClose={this.handleClose} onSubmit={this.handleSubmit} />
        )}
      </div>
    )
  }
}

SuggestionGoogleForm.propTypes = {
  chatroom_id: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default SuggestionGoogleForm
