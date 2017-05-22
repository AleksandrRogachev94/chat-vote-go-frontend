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

  // Fetching Chatroom (its full info) leads to unnecessary re-rendering.
  // We are interested only in id and title.
  // shouldComponentUpdate(nextProps) {
  //   const { isFetching, errors, own_chatrooms, guest_chatrooms } = this.props
  //
  //   const checkOwn = (nextProps.own_chatrooms && own_chatrooms)  ?
  //     ! ((nextProps.own_chatrooms.length === own_chatrooms.length) &&
  //     nextProps.own_chatrooms.every((ch, i) => (
  //       (ch.id === own_chatrooms[i].id) && (ch.title === own_chatrooms[i].title)
  //     )))
  //     : true
  //
  //   const checkGuest = (nextProps.guest_chatrooms && guest_chatrooms)  ?
  //     ! ((nextProps.guest_chatrooms.length === guest_chatrooms.length) &&
  //     nextProps.guest_chatrooms.every((ch, i) => (
  //       (ch.id === guest_chatrooms[i].id) && (ch.title === guest_chatrooms[i].title)
  //     )))
  //     : true
  //
  //   return (
  //     nextProps.isFetching !== isFetching ||
  //     !deepEqual(nextProps.errors, errors) ||
  //     checkOwn || checkGuest
  //   )
  // }

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
