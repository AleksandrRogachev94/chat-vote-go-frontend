import React from 'react'
import PropTypes from 'prop-types'

const Suggestion = (props) => {
  return(
    <a className="panel-block">
      <img src={props.owner.avatar_thumb_url} alt="avatar" id="avatar-thumb" /> {props.title}
    </a>
  )
}

Suggestion.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  api_link: PropTypes.string,
  owner: PropTypes.object.isRequired
}

export default Suggestion
