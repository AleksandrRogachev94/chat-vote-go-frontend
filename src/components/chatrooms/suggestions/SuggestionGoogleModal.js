import React from 'react'
import PropTypes from 'prop-types'
import Carousel from './Carousel'
import powered_by_google from '../../../../public/powered_by_google.png'

class SuggestionGoogleModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      suggestion: {}
    }
  }

  componentDidMount() {
    this.service = new window.google.maps.places.PlacesService(document.getElementById('service-helper'))
    if(this.props.place_id) {
      this.service.getDetails({ placeId: this.props.place_id }, (place, status) => {
        if(status === window.google.maps.places.PlacesServiceStatus.OK) {
          this.setState({ suggestion: place })
        }
      })
    }
  }

  render() {
    const { onClose, onSubmit, voters } = this.props
    const { suggestion } = this.state

    return (
      <div className="modal fade" id="modal-info" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">{suggestion.name}</h4>
            </div>
            <div className="modal-body">
              <section className="modal-card-body">
                <div style={{textAlign: 'center'}}>
                  { suggestion.photos && (
                    <Carousel photos={suggestion.photos.map((photo) => (
                      photo.getUrl({'maxWidth': 400, 'maxHeight': 400})
                    ))} />
                  )}
                </div>
                <p><b>Address:</b> {suggestion.formatted_address}</p>
                { suggestion.international_phone_number && (<p><b>Phone Number</b>: {suggestion.international_phone_number}</p>) }
                { suggestion.rating && (<p><b>Rating</b>: {suggestion.rating}</p>) }
                { suggestion.price_level && (<p><b>Price Level (0...4)</b>: {suggestion.price_level}</p>) }
                { suggestion.website && (<p><a href={suggestion.website} target="_blank">Website</a></p>) }
                {suggestion.opening_hours && suggestion.opening_hours.weekday_text.map((txt, i) => (
                  <p key={i}><em>{txt}</em></p>
                ))}
              </section>

              <section>
                <div id="service-helper"></div>
                <div className="content" style={{backgroundColor: 'white', textAlign: 'center'}}>
                  <img src={powered_by_google} alt="Powered By Google" />
                </div>
              </section>

              {voters && (
                <section className="modal-card-body">
                  <h4 className="title is-4">Voters</h4>
                  {voters.map((voter) => (
                    <a key={voter.id} href={`/users/${voter.id}`} className="inline-user" >
                      <div><img src={voter.avatar_thumb_url} alt="avatar" className="avatar-thumb" /></div>
                      <div>{voter.nickname}</div>
                    </a>
                  ))}
                </section>
              )}
            </div>

            { onSubmit && (
              <div className="modal-footer">
                <a className="btn btn-success" data-dismiss="modal" aria-label="Close" onClick={onSubmit}>Create</a>
                <a className="btn btn-danger" data-dismiss="modal" aria-label="Close" onClick={onClose}>Cancel</a>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

SuggestionGoogleModal.propTypes = {
  place_id: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  voters: PropTypes.array
}

SuggestionGoogleModal.defaultProps = {
  isOpen: false
}

export default SuggestionGoogleModal
