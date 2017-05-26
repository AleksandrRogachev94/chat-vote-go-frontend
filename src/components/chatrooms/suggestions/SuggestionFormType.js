import React from 'react'
import PropTypes from 'prop-types'

const SuggestionFormType = ({ isCustom, handleChangeType }) => {
  return (
    <div className="btn-group">
      <a className="btn btn-default" disabled={isCustom} onClick={handleChangeType}>
        Custom
      </a>
      <a className="btn btn-default" disabled={!isCustom} onClick={handleChangeType}>
        Search
      </a>
    </div>
  )
}

SuggestionFormType.propTypes = {
  isCustom: PropTypes.bool.isRequired,
  handleChangeType: PropTypes.func.isRequired
}

export default SuggestionFormType
