import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { vote } from '../../actions/suggestionsActions'
import { getCurrentUser } from '../../reducers/index'
import SuggestionInfoModal from './SuggestionInfoModal'
import PrimaryButton from '../common/PrimaryButton'

class Suggestion extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isSelected: false
    }

    this.handleChoose = this.handleChoose.bind(this)
    this.handleUnchoose = this.handleUnchoose.bind(this)
    this.handleVote = this.handleVote.bind(this)
  }

  handleChoose(ev) {
    ev.preventDefault()
    this.setState({ isSelected: true })
  }

  handleUnchoose(ev) {
    this.setState({ isSelected: false })
  }

  handleVote(ev) {
    ev.preventDefault()
    this.props.vote(this.props.suggestion.id)
  }



  render() {
    const { suggestion, current_user_id } = this.props

    return(
      <div>
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
          </div>
          <div className="column is-one-quarter">
            <PrimaryButton value="vote" onClick={this.handleVote}
              disabled={!!suggestion.voters.find(voter => voter.id === current_user_id)}
            />
          </div>
        </div>
        <SuggestionInfoModal suggestion={suggestion} isOpen={this.state.isSelected} onClose={this.handleUnchoose} />
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
