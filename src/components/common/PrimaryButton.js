import React from 'react'
import PropTypes from 'prop-types';

export default function PrimaryButton({ isLoading, value, onClick }) {

  console.log("PrimaryButton render")

  return (
    <button className={isLoading ? "button is-primary is-loading" : "button is-primary"}
                      onClick={onClick}
                      type="submit">{value}
    </button>
  )
}

PrimaryButton.propTypes = {
  isLoading: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

PrimaryButton.defaultProps = {
  isLoading: false
}
