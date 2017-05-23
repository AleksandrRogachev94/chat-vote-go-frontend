import React from 'react'
import PropTypes from 'prop-types'

class SuggestionGoogleForm extends React.Component {

  componentDidMount() {
    const searchBox = new window.google.maps.places.SearchBox(document.getElementById("autocomplete"))
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
      console.log(places)
    })
  }

  render() {
    return (
      <p className="control">
        <input className="input" type="text" id="autocomplete" />
      </p>
    )
  }
}

SuggestionGoogleForm.propTypes = {

}

export default SuggestionGoogleForm
