import React from 'react'
import PropTypes from 'prop-types'

const ToggleViewMode = ({ viewMode, handleChangeMode }) => {
  return (
    <div className="field has-addons">

      <p className="control">
        <a className="button" data-mode="chat" disabled={viewMode === 'chat'}
           onClick={handleChangeMode}>
          Chat
        </a>
      </p>

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

ToggleViewMode.propTypes = {
  viewMode: PropTypes.oneOf(['chat', 'stats', 'review', 'form']).isRequired,
  handleChangeMode: PropTypes.func.isRequired
}

export default ToggleViewMode
