import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import PrimaryButton from '../common/PrimaryButton'

class Suggestion extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isSelected: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(ev) {
    ev.preventDefault()
    this.setState((prevState, props) => ({ isSelected: !prevState.isSelected }))
  }

  render() {
    const { suggestion } = this.props

    let info = null
    if(this.state.isSelected) {
      info = (
        <p>Description: {suggestion.description}</p>
      )
    }

    return(
      <div className="panel-block">
        <div className="column is-one-quarter">
          <Link to={`/users/${suggestion.owner.id}`}>
            <img src={suggestion.owner.avatar_thumb_url} alt="avatar" id="avatar-thumb" />
          </Link>
        </div>
        <div className="column">
          <a href="#" onClick={this.handleClick}>
            <p>{suggestion.title}</p>
            <p>votes: {suggestion.votes}</p>
          </a>
          { this.state.isSelected && (info)}
        </div>
        <div className="column is-one-quarter">
          <PrimaryButton value="vote" />
        </div>
      </div>
    )
  }
}

Suggestion.propTypes = {
  suggestion: PropTypes.object.isRequired,
}

export default Suggestion
