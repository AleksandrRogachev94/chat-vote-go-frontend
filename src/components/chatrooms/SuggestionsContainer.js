import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { getSuggestionsFromChatroom, getIsFetchingChatroom } from '../../reducers/index'
import SuggestionsToggleMode from './SuggestionsToggleMode'
import SuggestionsReview from './SuggestionsReview'
import SuggestionForm from './SuggestionForm'

class SuggestionsContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      viewMode: 'review'
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
    const { chatroom_id, suggestions } = this.props
    const viewMode = this.state.viewMode

    if(!chatroom_id) {
      return (<h1 className="title has-text-centered">Choose Chatroom</h1>)
    } else {
      let choosed = null
      switch(viewMode) {
        case 'review':
          choosed = (<SuggestionsReview suggestions={suggestions} />)
          break
        case 'stats':
          choosed = null
          break
        case 'form':
          choosed = <SuggestionForm chatroom_id={chatroom_id} />
          break
        default:
          choosed = (<SuggestionsReview suggestions={suggestions} />)
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
  isFetching: PropTypes.bool
}

const mapStateToProps = (state, { params }) => ({
  chatroom_id: params.id,
  suggestions: getSuggestionsFromChatroom(state, params.id),
  isFetching: getIsFetchingChatroom(state, params.id)
})

export default withRouter(
  connect(mapStateToProps, {})(SuggestionsContainer)
)
