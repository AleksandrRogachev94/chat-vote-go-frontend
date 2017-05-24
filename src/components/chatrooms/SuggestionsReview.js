import React from 'react'
import PropTypes from 'prop-types'
import Suggestion from './Suggestion'
import SuggestionInfoModal from './SuggestionInfoModal'

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

    let suggestionsJSX
    if(suggestions) suggestionsJSX = suggestions.map(sug => (
      <Suggestion key={sug.id} current_user_id={current_user_id} handleVote={this.handleVote}
        handleChoose={this.handleChoose} suggestion={sug} />
    ))

    return (
      <div>
        <nav className="panel" id="suggestions">
          <p className="panel-heading">
            Suggestions
          </p>
          {suggestionsJSX}
        </nav>
        {this.state.selectedSug > 0 && (
          <SuggestionInfoModal suggestion={suggestions.find(sug => sug.id === parseInt(this.state.selectedSug,10))}
            isOpen={this.state.selectedSug > 0} onClose={this.handleUnchoose} />
        )}
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
