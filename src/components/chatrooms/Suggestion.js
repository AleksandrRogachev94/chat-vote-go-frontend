import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { vote } from '../../actions/suggestionsActions'
import { getCurrentUser } from '../../reducers/index'
import PrimaryButton from '../common/PrimaryButton'

class Suggestion extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isSelected: false,
      isModalOpen: false
    }

    this.handleChoose = this.handleChoose.bind(this)
    this.handleVote = this.handleVote.bind(this)
  }

  handleChoose(ev) {
    ev.preventDefault()
    this.setState((prevState, props) => ({ isSelected: !prevState.isSelected }))
  }

  handleVote(ev) {
    ev.preventDefault()
    this.props.vote(this.props.suggestion.id)
  }

  render() {
    const { suggestion, current_user_id } = this.props

    let info = null
    if(this.state.isSelected) {
      info = (
        <p>Description: {suggestion.description}</p>
      )
    }
    const voters = suggestion.voters.map((voter) => (
      <a href={`/users/${voter.id}`}><img className="avatar-thumb" src={voter.avatar_thumb_url} /></a>
    ))
    console.log(voters)

    return(
      <div className="panel-block">
        <div className="column is-one-quarter">
          <Link to={`/users/${suggestion.owner.id}`}>
            <img src={suggestion.owner.avatar_thumb_url} alt="avatar" className="avatar-thumb" />
          </Link>
        </div>
        <div className="column is-half">
          <a href="#" onClick={this.handleChoose}>
            <p>{suggestion.title}</p>
            <p>votes: {suggestion.voters.length}</p>
          </a>
          { this.state.isSelected && (info)}
        </div>
        <div className="column is-one-quarter">
          <PrimaryButton value="vote" onClick={this.handleVote}
            disabled={suggestion.voters.includes(current_user_id)}
          />
        </div>
      </div>
    )
  }
}

Suggestion.propTypes = {
  suggestion: PropTypes.object.isRequired,
  current_user_id: PropTypes.number.isRequired,
  vote: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  current_user_id: getCurrentUser(state).id
})

export default connect(mapStateToProps, { vote })(Suggestion)
