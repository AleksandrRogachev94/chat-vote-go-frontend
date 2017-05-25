import React from 'react'
import PropTypes from 'prop-types'

const SuggestionFormType = ({ isCustom, handleChangeType }) => {
  return (
    <div className="field has-addons">
      <p className="control">
        <a className="button" disabled={isCustom} onClick={handleChangeType}>
          <span>Custom</span>
        </a>
      </p>

      <p className="control">
        <a className="button" disabled={!isCustom} onClick={handleChangeType}>
          <span>Search</span>
        </a>
      </p>
    </div>
  )
}

SuggestionFormType.propTypes = {
  isCustom: PropTypes.bool.isRequired,
  handleChangeType: PropTypes.func.isRequired
}

export default SuggestionFormType
