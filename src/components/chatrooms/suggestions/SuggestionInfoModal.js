import React from 'react'
import PropTypes from 'prop-types'

const SuggestionInfoModal = ({ suggestion, isOpen, onClose }) => {
  return(
    <div className="modal fade" id="modal-info" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title" id="myModalLabel">{suggestion.title}</h4>
          </div>
          <div className="modal-body">
            <section>
              {suggestion.description && (
                <div>
                  <h4 className="title is-4">Description</h4>
                  <p>{suggestion.description}</p>
                </div>
              )}
            </section>
            <section>
              <h4 className="title is-4">Voters</h4>
              {suggestion.voters.map((voter) => (
                <a key={voter.id} href={`/users/${voter.id}`} className="inline-user" >
                  <div><img src={voter.avatar_thumb_url} alt="avatar" className="avatar-thumb" /></div>
                  <div>{voter.nickname}</div>
                </a>
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

SuggestionInfoModal.propTypes = {
  isOpen: PropTypes.bool,
  suggestion: PropTypes.object,
  onClose: PropTypes.func.isRequired
}

SuggestionInfoModal.defaultProps = {
  isOpen: false
}

export default SuggestionInfoModal
