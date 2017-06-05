import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { subscribeToChatroom, unsubscribeFromChatroom } from '../../actions/actioncableActions'
import { fetchChatroom } from '../../actions/chatroomActions'
import { getIsFetchingChatroom, getChatroomErrors } from '../../reducers/index'
import isEmpty from 'lodash/isEmpty'
import ToggleViewMode from './ToggleViewMode'
import ChatroomContainer from './chatroomBoard/ChatroomContainer'
import SuggestionsContainer from './suggestions/SuggestionsContainer'
import Error from '../common/Error'

class ChatroomElementsContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      viewMode: 'review'
    }

    this.handleChangeMode = this.handleChangeMode.bind(this)
  }

  componentDidMount() {
    const { subscribeToChatroom, fetchChatroom, chatroom_id } = this.props
    if(chatroom_id) {
      fetchChatroom(chatroom_id)
      subscribeToChatroom(chatroom_id)
    }
  }

  componentDidUpdate(prevProps) {
    const { subscribeToChatroom, fetchChatroom, chatroom_id } = this.props
    if(chatroom_id && prevProps.chatroom_id !== chatroom_id) {
      fetchChatroom(chatroom_id)
      subscribeToChatroom(chatroom_id)
    }
  }

  componentWillUnmount() {
    this.props.unsubscribeFromChatroom()
  }

  handleChangeMode(ev) {
    ev.preventDefault()
    this.setState({
      viewMode: ev.target.dataset.mode
    })
  }

  render() {
    console.log("ChatroomElements render")
    const viewMode = this.state.viewMode
    const { chatroom_id, errors, isFetching } = this.props

    let chosen = null
    switch(viewMode) {
      case 'chat':
        chosen = (<ChatroomContainer /> )
        break
      case 'review':
      case 'stats':
      case 'form':
        chosen = (<SuggestionsContainer viewMode={viewMode} /> )
        break
      default:
        chosen = (<SuggestionsContainer viewMode={viewMode} /> )
    }

    if(!isEmpty(errors)) {
      return (
        <div>
          {errors.other && <Error msg={errors.other.join(", ")} />}
          {errors.auth && <Error msg={errors.auth.join(", ")} />}
        </div>
      )
    } else if(!chatroom_id) {
      return <h1>Choose Chatroom</h1>
    } else if(isFetching) {
      return <p>Loading...</p>
    } else {
      return (
        <div>
          {chatroom_id && (
            <ToggleViewMode viewMode={viewMode} handleChangeMode={this.handleChangeMode} />
          )}
          {chosen}
        </div>
      )
    }
  }
}

ChatroomElementsContainer.propTypes = {
  chatroom_id: PropTypes.string,
  fetchChatroom: PropTypes.func.isRequired,
  subscribeToChatroom: PropTypes.func.isRequired,
  unsubscribeFromChatroom: PropTypes.func.isRequired
}

ChatroomElementsContainer.defaultProps = {
  errors: {}
}

const mapStateToProps = (state, { params }) => ({
  chatroom_id: params.id,
  isFetching: getIsFetchingChatroom(state, params.id),
  errors: getChatroomErrors(state, params.id)
})

export default withRouter(
  connect(mapStateToProps, { fetchChatroom, subscribeToChatroom, unsubscribeFromChatroom })(ChatroomElementsContainer)
)
