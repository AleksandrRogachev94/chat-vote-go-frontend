import React from 'react'
import PropTypes from 'prop-types'
import PrimaryButton from '../../common/PrimaryButton'
import InputField from '../../common/InputField'

const SuggestionCustomForm = ({ handleChange, handleSubmit, title, description }) => {
  return (
    <form onSubmit={handleSubmit}>
      <InputField name="title" label="Title*" placeholder="Title" type="text" value={title}
        onChange={handleChange} />

      <div className="form-group">
        <label className="label">Description</label>
        <textarea className="form-control" name="description" placeholder="Add Description" value={description} onChange={handleChange} />
      </div>
      <PrimaryButton value="Create Suggestion" disabled={!title} />
    </form>
  )
}

SuggestionCustomForm.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default SuggestionCustomForm
