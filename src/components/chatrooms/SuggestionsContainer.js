import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { getSuggestionsFromChatroom, getIsFetchingChatroom, getCurrentUser } from '../../reducers/index'
import { addSuggestion, vote } from '../../actions/suggestionsActions'
import SuggestionsToggleMode from './SuggestionsToggleMode'
import SuggestionsReview from './SuggestionsReview'
import SuggestionForm from './SuggestionForm'
import SuggestionsStats from './SuggestionsStats'

class SuggestionsContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      viewMode: 'form'
    }

    this.handleChangeMode = this.handleChangeMode.bind(this)
  }

  handleChangeMode(ev) {
    ev.preventDefault()
    this.setState({
      viewMode: ev.target.dataset.mode
    })
  }

  render() {
    const { chatroom_id, suggestions, addSuggestion, vote, current_user_id } = this.props
    const viewMode = this.state.viewMode

    if(!chatroom_id) {
      return (<h1 className="title has-text-centered">Choose Chatroom</h1>)
    } else {
      let choosed = null
      switch(viewMode) {
        case 'review':
          choosed = (<SuggestionsReview suggestions={suggestions} current_user_id={current_user_id} vote={vote} />)
          break
        case 'stats':
          choosed = (<SuggestionsStats suggestions={suggestions} />)
          break
        case 'form':
          choosed = (<SuggestionForm chatroom_id={chatroom_id} addSuggestion={addSuggestion} />)
          break
        default:
          choosed = (<SuggestionsReview suggestions={suggestions} current_user_id={current_user_id} vote={vote} />)
      }

      return (
        <div>
          <SuggestionsToggleMode viewMode={viewMode} handleChangeMode={this.handleChangeMode} />
          {choosed}
        </div>
      )
    }
  }
}

SuggestionsContainer.propTypes = {
  chatroom_id: PropTypes.string,
  suggestions: PropTypes.array,
  isFetching: PropTypes.bool,
  current_user_id: PropTypes.number.isRequired,
  addSuggestion: PropTypes.func.isRequired,
  vote: PropTypes.func.isRequired
}

const mapStateToProps = (state, { params }) => ({
  chatroom_id: params.id,
  suggestions: getSuggestionsFromChatroom(state, params.id),
  isFetching: getIsFetchingChatroom(state, params.id),
  current_user_id: getCurrentUser(state).id
})

export default withRouter(
  connect(mapStateToProps, { addSuggestion, vote })(SuggestionsContainer)
)
