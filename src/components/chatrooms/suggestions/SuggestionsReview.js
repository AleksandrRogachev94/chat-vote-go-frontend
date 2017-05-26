import React from 'react'
import PropTypes from 'prop-types'
import Suggestion from './Suggestion'
import SuggestionInfoModal from './SuggestionInfoModal'
import SuggestionGoogleModal from './SuggestionGoogleModal'

class SuggestionsReview extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedSug: -1
    }

    this.handleChoose = this.handleChoose.bind(this)
    this.handleUnchoose = this.handleUnchoose.bind(this)
    this.handleVote = this.handleVote.bind(this)
  }

  handleChoose(ev) {
    ev.preventDefault()
    this.setState({ selectedSug: ev.currentTarget.dataset.id })
  }

  componentDidUpdate() {
    if(this.state.selectedSug > -1) window.jQuery('#modal-info').modal('show')
  }

  handleUnchoose(ev) {
    this.setState({ selectedSug: -1 })
  }

  handleVote(ev) {
    ev.preventDefault()
    this.props.vote(ev.target.dataset.id)
  }

  render() {
    console.log("SuggestionsReview render")
    const { suggestions, current_user_id } = this.props
    const { selectedSug } = this.state

    let suggestionsJSX
    if(suggestions) suggestionsJSX = suggestions.map(sug => (
      <Suggestion key={sug.id} current_user_id={current_user_id} handleVote={this.handleVote}
        handleChoose={this.handleChoose} suggestion={sug} />
    ))

    let suggestionModal = null
    if(selectedSug > -1) {
      const suggestion = suggestions.find(sug => sug.id === parseInt(this.state.selectedSug,10))
      if(suggestion.place_id_google) {
        suggestionModal = (
          <SuggestionGoogleModal place_id={suggestion.place_id_google}
            onClose={this.handleUnchoose} voters={suggestion.voters} />
        )
      } else {
        suggestionModal = (
          <SuggestionInfoModal suggestion={suggestion}
            isOpen={selectedSug > -1} onClose={this.handleUnchoose} />
        )
      }
    }

    return (
      <div className="review">
        <h3>Suggestions</h3>
        <ul className="list-group">
          {suggestionsJSX}
        </ul>
        {suggestionModal}
      </div>
    )
  }
}

SuggestionsReview.propTypes = {
  suggestions: PropTypes.array,
  current_user_id: PropTypes.number.isRequired,
  vote: PropTypes.func.isRequired
}

export default SuggestionsReview
