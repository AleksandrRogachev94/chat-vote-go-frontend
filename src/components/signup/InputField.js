import React from 'react'
import PropTypes from 'prop-types';

export default function InputField({ name, label, placeholder, type, value, onChange, iconClass, errors }) {

  console.log("InputField render")

  const pClass = iconClass ? "control has-icons-left" : "control"
  const inputClass = errors ? "input is-danger" : "input"
  return (
    <div className="field">
      <label className="label">Password</label>
      <p className={pClass}>
        <input type={type} name={name} placeholder={placeholder} className={inputClass}
          value={value} onChange={onChange} />
        { iconClass && (
          <span className="icon is-small is-left">
            <i className={iconClass}></i>
          </span>
        )}
      </p>
      {errors && <p className="help is-danger">{errors}</p>}
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
