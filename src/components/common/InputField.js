import React from 'react'
import PropTypes from 'prop-types';

export default function InputField({ name, label, placeholder, type, value, onChange, iconClass, errors }) {

  let divClass = "form-group"
  if(iconClass) divClass += " has-feedback"
  if(errors) divClass += " has-error"

  return (
    <div className={divClass}>
      <label className="control-label">{label}</label>
        <div className={iconClass ? "input-group" : ""}>
          <input type={type} name={name} className="form-control" placeholder={placeholder}
            onChange={onChange} value={value} />
          {iconClass && (<span className="input-group-addon"><span className={iconClass}></span></span>)}
        </div>
      {errors && <span className="help-block">{errors}</span>}
    </div>
  )
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  iconClass: PropTypes.string,
  errors: PropTypes.string
}
