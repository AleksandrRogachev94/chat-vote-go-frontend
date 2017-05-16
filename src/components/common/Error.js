import React from 'react'
import PropTypes from 'prop-types'

export default function Error({ msg }) {
  return (
    <article className="message is-danger">
      <div className="message-body">
        {msg}
      </div>
    </article>
  )
}

Error.propTypes = {
  msg: PropTypes.string.isRequired
}
