import React from 'react'
import PropTypes from 'prop-types'

const SuggestionsToggleMode = ({ viewMode, handleChangeMode }) => {
  return (
    <div className="field has-addons">
      <p className="control">
        <a className="button" data-mode="stats" disabled={viewMode === 'stats'}
           onClick={handleChangeMode}>
          Statistics
        </a>
      </p>

      <p className="control">
        <a className="button" data-mode="review" disabled={viewMode === 'review'}
           onClick={handleChangeMode}>
          Review
        </a>
      </p>

      <p className="control">
        <a className="button" data-mode="form" disabled={viewMode === 'form'}
           onClick={handleChangeMode}>
          New
        </a>
      </p>
    </div>
  )
}

SuggestionsToggleMode.propTypes = {
  viewMode: PropTypes.oneOf(['stats', 'review', 'form']).isRequired,
  handleChangeMode: PropTypes.func.isRequired
}

export default SuggestionsToggleMode
