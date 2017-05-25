import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { subscribeToChatroom, unsubscribeFromChatroom } from '../../actions/actioncableActions'
import { fetchChatroom } from '../../actions/chatroomActions'
import ToggleViewMode from './ToggleViewMode'
import ChatroomContainer from './chatroomBoard/ChatroomContainer'
import SuggestionsContainer from './suggestions/SuggestionsContainer'

class ChatroomElements extends React.Component {

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

    return (
      <div>
        <ToggleViewMode viewMode={viewMode} handleChangeMode={this.handleChangeMode} />
        {chosen}
      </div>
    )
  }
}

ChatroomElements.propTypes = {
  chatroom_id: PropTypes.string,
  fetchChatroom: PropTypes.func.isRequired,
  subscribeToChatroom: PropTypes.func.isRequired,
  unsubscribeFromChatroom: PropTypes.func.isRequired
}

const mapStateToProps = (state, { params }) => ({
  chatroom_id: params.id,
})

export default withRouter(
  connect(mapStateToProps, { fetchChatroom, subscribeToChatroom, unsubscribeFromChatroom })(ChatroomElements)
)
