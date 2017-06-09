import React from 'react'
import PropTypes from 'prop-types'

export default function Error({ msg }) {
  return (
    <div className="alert alert-danger error">
      {msg}
    </div>
  )
}

Error.propTypes = {
  msg: PropTypes.string.isRequired
}
