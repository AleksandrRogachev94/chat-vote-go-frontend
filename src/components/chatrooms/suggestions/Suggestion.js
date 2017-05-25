import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import deepEqual from 'deep-equal'

class Suggestion extends React.Component {

  // Suggestion is calculated. Need to check deep equality.
  shouldComponentUpdate(nextProps) {
    return nextProps.current_user_id !== this.props.current_user_id ||
      !deepEqual(nextProps.suggestion, this.props.suggestion)
  }

  render() {
    console.log("Suggestion render")
    const { suggestion, current_user_id, handleVote, handleChoose } = this.props
    return(
      <div>
        <div className="panel-block">
          <div className="column is-one-quarter">
            <Link to={`/users/${suggestion.owner.id}`}>
              <img src={suggestion.owner.avatar_thumb_url} alt="avatar" className="avatar-thumb" />
            </Link>
          </div>
          <div className="column is-half">
            <a href="#" onClick={handleChoose} data-id={suggestion.id}>
              <p>{suggestion.title}</p>
              <p>votes: {suggestion.voters.length}</p>
            </a>
          </div>
          <div className="column is-one-quarter">
            <button className={"button is-primary"}
              disabled={!!suggestion.voters.find(voter => voter.id === current_user_id)}
              value="vote" data-id={suggestion.id} onClick={handleVote} type="submit">
              vote
            </button>
          </div>
        </div>
      </div>
    )
  }
}

Suggestion.propTypes = {
  suggestion: PropTypes.object.isRequired,
  current_user_id: PropTypes.number.isRequired,
  handleChoose: PropTypes.func.isRequired,
  handleVote: PropTypes.func.isRequired
}

export default Suggestion
