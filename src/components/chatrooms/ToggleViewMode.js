import React from 'react'
import PropTypes from 'prop-types'

const ToggleViewMode = ({ viewMode, handleChangeMode }) => {
  return (
    <div className="btn-group">
      <a className="btn btn-default" data-mode="chat" disabled={viewMode === 'chat'}
         onClick={handleChangeMode}>
        Chat
      </a>
      <a className="btn btn-default" data-mode="stats" disabled={viewMode === 'stats'}
         onClick={handleChangeMode}>
        Statistics
      </a>
      <a className="btn btn-default" data-mode="review" disabled={viewMode === 'review'}
         onClick={handleChangeMode}>
        Review
      </a>
      <a className="btn btn-default" data-mode="form" disabled={viewMode === 'form'}
         onClick={handleChangeMode}>
        New
      </a>
    </div>
  )
}

ToggleViewMode.propTypes = {
  viewMode: PropTypes.oneOf(['chat', 'stats', 'review', 'form']).isRequired,
  handleChangeMode: PropTypes.func.isRequired
}

export default ToggleViewMode
