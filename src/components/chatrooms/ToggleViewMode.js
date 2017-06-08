import React from 'react'
import PropTypes from 'prop-types'

const ToggleViewMode = ({ viewMode, newMessagesCount, newSuggestionsCount, handleChangeMode }) => {
  return (
    <div className="btn-group">
      <a className="btn btn-default" data-mode="chat" disabled={viewMode === 'chat'}
         onClick={handleChangeMode}>
        Chat {newMessagesCount > 0 && <b data-mode="chat">({newMessagesCount})</b>}
      </a>
      <a className="btn btn-default" data-mode="stats" disabled={viewMode === 'stats'}
         onClick={handleChangeMode}>
        Statistics {newSuggestionsCount > 0 && <b data-mode="chat">({newSuggestionsCount})</b>}
      </a>
      <a className="btn btn-default" data-mode="review" disabled={viewMode === 'review'}
         onClick={handleChangeMode}>
        Review {newSuggestionsCount > 0 && <b data-mode="chat">({newSuggestionsCount})</b>}
      </a>
      <a className="btn btn-default" data-mode="form" disabled={viewMode === 'form'}
         onClick={handleChangeMode}>
        New
      </a>
      <a className="btn btn-default" data-mode="settings" disabled={viewMode === 'settings'}
         onClick={handleChangeMode}>
        Settings
      </a>
    </div>
  )
}

ToggleViewMode.propTypes = {
  viewMode: PropTypes.oneOf(['chat', 'stats', 'review', 'form', 'settings']).isRequired,
  newMessagesCount: PropTypes.number,
  handleChangeMode: PropTypes.func.isRequired
}

export default ToggleViewMode
