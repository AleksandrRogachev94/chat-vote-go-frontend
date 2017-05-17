import React from 'react'
import PropTypes from 'prop-types';

export default function PrimaryButton({ isLoading, value, onClick }) {

  return (
    <div className="has-text-centered">
      <button className={isLoading ? "button is-primary is-loading" : "button is-primary"}
                        onClick={onClick}
                        type="submit">{value}
      </button>
    </div>
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
