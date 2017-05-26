import React from 'react'
import PropTypes from 'prop-types';

export default function PrimaryButton({ isLoading, disabled, value, onClick }) {
  return (
    <div className="form-group" style={{margin: '0.5em'}}>
      <button className="btn btn-primary"
              disabled={disabled || isLoading}
              onClick={onClick}
              type="submit">
        {isLoading && (<i className="fa fa-circle-o-notch fa-spin">&nbsp;</i>)}
        {value}
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
  disabled: false
}
