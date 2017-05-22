import React from 'react'
import PropTypes from 'prop-types';

export default function PrimaryButton({ isLoading, disabled, value, onClick }) {

  return (
    <div className="has-text-centered">
      <button className={isLoading ? "button is-primary is-loading" : "button is-primary"}
              disabled={disabled}
              onClick={onClick}
              type="submit">{value}
      </button>
    </div>
  )
}

PrimaryButton.propTypes = {
  isLoading: PropTypes.bool,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

PrimaryButton.defaultProps = {
  isLoading: false,
  disabled: false,
  onClick: () => alert("You clicked the button!")
}
