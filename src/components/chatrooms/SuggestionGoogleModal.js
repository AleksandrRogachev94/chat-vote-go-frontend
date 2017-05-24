import React from 'react'
import PropTypes from 'prop-types'

const SuggestionGoogleModal = ({ suggestion, isOpen, onClose, onSubmit }) => {

  return (
    <div className={isOpen ? "modal is-active" : 'modal'}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{suggestion.name}</p>
        </header>
        <section className="modal-card-body">
          <div>
            { suggestion.photos && <img src={suggestion.photos[0].getUrl({'maxWidth': 400, 'maxHeight': 400})} alt="place" />}
          </div>
          <p>{suggestion.formatted_address}</p>
          { suggestion.rating && (<p>Rating: {suggestion.rating}</p>) }
        </section>
        <footer className="modal-card-foot">
          { onSubmit && (<a className="button is-success" onClick={onSubmit}>Create</a>)}
          <a className="button" onClick={onClose}>Cancel</a>
        </footer>
      </div>
    </div>
  )
}

SuggestionGoogleModal.propTypes = {
  isOpen: PropTypes.bool,
  suggestion: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func
}

SuggestionGoogleModal.defaultProps = {
  isOpen: false
}

export default SuggestionGoogleModal
