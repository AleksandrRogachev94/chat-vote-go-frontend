import React from 'react'
import PropTypes from 'prop-types'

const Carousel = ({ photos }) => {
  return (
    <div className="carousel slide" id="carousel" data-ride="carousel" style={{textAlign: "right"}}>
      <ol className="carousel-indicators">
        {photos.map((photo, i) => (
          <li key={i} data-target="#carousel" data-slide-to={i} className={i === 0 ? "active" : ""}></li>
        ))}
      </ol>

      <div className="carousel-inner" role="listbox">
        {photos.map((photo, i) => (
          <div key={i} className={i === 0 ? "item active" : "item" }>
            <img className="img-responsive center-block" src={photo} alt="Place" />
          </div>
        ))}
      </div>

      <a className="left carousel-control" href="#carousel" role="button" data-slide="prev">
        <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="right carousel-control" href="#carousel" role="button" data-slide="next">
        <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  )
}

Carousel.propTypes = {
  photos: PropTypes.array.isRequired
}

export default Carousel
