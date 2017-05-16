import React from 'react'
import PropTypes from 'prop-types';

export default function AuthButton({ isLoading, value }) {

  console.log("AuthButton render")

  return (
    <button className={isLoading ? "button is-primary is-loading" : "button is-primary"} type="submit">Sign Up</button>
  )
}

AuthButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
}
