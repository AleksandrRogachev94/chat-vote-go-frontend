import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'
import { getSuggestionsFromChatroom, getCurrentUser, getChatroomOwner } from '../../../reducers/index'
import { clearNewSuggestionsCount } from '../../../actions/chatroomActions'
import { addSuggestion, removeSuggestion, vote } from '../../../actions/suggestionsActions'
import SuggestionsReview from './SuggestionsReview'
import SuggestionForm from './SuggestionForm'
import SuggestionsStats from './SuggestionsStats'

class SuggestionsContainer  extends React.Component {

  shouldComponentUpdate(nextProps) {
    return (
      (this.props.chatroom_id !== nextProps.chatroom_id) ||
      (this.props.viewMode !== nextProps.viewMode) ||
      (this.props.current_user_id !== nextProps.current_user_id) ||
      !deepEqual(this.props.suggestions, nextProps.suggestions)
    )
  }

  componentDidMount() {
    this.props.clearNewSuggestionsCount(this.props.chatroom_id)
  }
  componentDidUpdate(prevProps) {
    this.props.clearNewSuggestionsCount(this.props.chatroom_id)
  }

  render() {
    const { viewMode, chatroom_id, chatroomOwner, suggestions, addSuggestion, removeSuggestion, vote, current_user_id } = this.props

    let chosen = null
    switch(viewMode) {
      case 'review':
        chosen = (<SuggestionsReview suggestions={suggestions} current_user_id={current_user_id}
          chatroomOwner={chatroomOwner} vote={vote} removeSuggestion={removeSuggestion} />)
        break
      case 'stats':
        chosen = (<SuggestionsStats suggestions={suggestions} />)
        break
      case 'form':
        chosen = (<SuggestionForm chatroom_id={chatroom_id} addSuggestion={addSuggestion} />)
        break
      default:
        chosen = (<SuggestionsReview suggestions={suggestions} current_user_id={current_user_id} vote={vote} />)
    }

    return (
      <div>
        {chosen}
      </div>
    )
  }
}

SuggestionsContainer.propTypes = {
  viewMode: PropTypes.string,
  chatroom_id: PropTypes.string,
  chatroomOwner: PropTypes.object,
  suggestions: PropTypes.array,
  current_user_id: PropTypes.number.isRequired,
  addSuggestion: PropTypes.func.isRequired,
  removeSuggestion: PropTypes.func.isRequired,
  vote: PropTypes.func.isRequired,
  clearNewSuggestionsCount: PropTypes.func.isRequired
}

const mapStateToProps = (state, { params, viewMode }) => ({
  viewMode,
  chatroom_id: params.id,
  chatroomOwner: getChatroomOwner(state, params.id),
  suggestions: getSuggestionsFromChatroom(state, params.id),
  current_user_id: getCurrentUser(state).id
})

export default withRouter(
  connect(mapStateToProps, { addSuggestion, removeSuggestion, vote, clearNewSuggestionsCount })(SuggestionsContainer)
)
