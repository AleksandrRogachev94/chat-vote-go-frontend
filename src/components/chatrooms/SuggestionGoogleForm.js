import React from 'react'
import PropTypes from 'prop-types'
import SuggestionInfoModal from './SuggestionInfoModal'

class SuggestionGoogleForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpenModal: false,
      suggestion: {}
    }
  }

  componentDidMount() {
    const searchBox = new window.google.maps.places.Autocomplete(document.getElementById("autocomplete"))
    searchBox.addListener('place_changed', () => {
      var place = searchBox.getPlace()
      console.log(place)
      this.setState({ isOpenModal: true, suggestion: place })
    })
  }

  render() {
    return (
      <div>
        <p className="control">
          <input className="input" type="text" id="autocomplete" />
        </p>
        <SuggestionInfoModal fromGoogle={this.state.suggestion} isOpen={this.state.isOpenModal}
          onClose={() => this.setState({ isOpenModal: false })} />
      </div>
    )
  }
}

SuggestionGoogleForm.propTypes = {

}

export default SuggestionGoogleForm
