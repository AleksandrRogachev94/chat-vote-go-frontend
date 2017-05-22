import React from 'react'
import PropTypes from 'prop-types'
import Suggestion from './Suggestion'

const SuggestionsReview = (props) => {
  let suggestions
  if(props.suggestions) suggestions = props.suggestions.map(sug => (
    <Suggestion key={sug.id} title={sug.title} owner={sug.owner}
                description={sug.description} api_link={sug.api_link} />
  ))

  return (
    <nav className="panel">
      <p className="panel-heading">
        Suggestions
      </p>
      {suggestions}
    </nav>
  )
}

SuggestionsReview.propTypes = {
  suggestions: PropTypes.array
}

export default SuggestionsReview