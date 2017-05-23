import React from 'react'
import PropTypes from 'prop-types'

const SuggestionInfoModal = ({ suggestion, isOpen, onClose }) => {
  return (
    <div className={isOpen ? "modal is-active" : 'modal'}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{suggestion.title}</p>
          <button className="delete" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          {suggestion.description && (
            <div>
              <h4 className="title is-4">Description</h4>
              <p>{suggestion.description}</p>
            </div>
          )}
        </section>
        <section className="modal-card-body">
          <h4 className="title is-4">Voters</h4>
          {suggestion.voters.map((voter) => (
            <a key={voter.id} href={`/users/${voter.id}`} className="inline-user" >
              <div><img src={voter.avatar_thumb_url} className="avatar-thumb" /></div>
              <div>{voter.nickname}</div>
            </a>
          ))}
        </section>
      </div>
    </div>
  )
}

SuggestionInfoModal.propTypes = {
  isOpen: PropTypes.bool,
  suggestion: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
}

SuggestionInfoModal.defaultProps = {
  isOpen: false
}

export default SuggestionInfoModal
