import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'
import { getSuggestionsFromChatroom, getIsFetchingChatroom, getCurrentUser } from '../../../reducers/index'
import { addSuggestion, vote } from '../../../actions/suggestionsActions'
import SuggestionsReview from './SuggestionsReview'
import SuggestionForm from './SuggestionForm'
import SuggestionsStats from './SuggestionsStats'

class SuggestionsContainer  extends React.Component {

  shouldComponentUpdate(nextProps) {
    return (
      (this.props.isFetching !== nextProps.isFetching) ||
      (this.props.chatroom_id !== nextProps.chatroom_id) ||
      (this.props.viewMode !== nextProps.viewMode) ||
      (this.props.current_user_id !== nextProps.current_user_id) ||
      !deepEqual(this.props.suggestions, nextProps.suggestions)
    )
  }

  render() {
    const { viewMode, chatroom_id, suggestions, addSuggestion, vote, current_user_id } = this.props

    if(!chatroom_id) {
      return (<h1 className="title has-text-centered">Choose Chatroom</h1>)
    } else {
      let chosen = null
      switch(viewMode) {
        case 'review':
          chosen = (<SuggestionsReview suggestions={suggestions} current_user_id={current_user_id} vote={vote} />)
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
}

SuggestionsContainer.propTypes = {
  viewMode: PropTypes.string,
  chatroom_id: PropTypes.string,
  suggestions: PropTypes.array,
  isFetching: PropTypes.bool,
  current_user_id: PropTypes.number.isRequired,
  addSuggestion: PropTypes.func.isRequired,
  vote: PropTypes.func.isRequired
}

const mapStateToProps = (state, { params, viewMode }) => ({
  viewMode,
  chatroom_id: params.id,
  suggestions: getSuggestionsFromChatroom(state, params.id),
  isFetching: getIsFetchingChatroom(state, params.id),
  current_user_id: getCurrentUser(state).id
})

export default withRouter(
  connect(mapStateToProps, { addSuggestion, vote })(SuggestionsContainer)
)
