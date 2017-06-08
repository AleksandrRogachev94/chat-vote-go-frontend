import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'
import { clearNewMessagesCount } from '../../../actions/messagesActions'
import { getChatroomMessages, getCurrentUser } from '../../../reducers/index'
import Chatroom from './Chatroom'

class ChatroomContainer extends React.Component {

  // Selectors make some calculations with chatroom details. Same objects are not the same here
  shouldComponentUpdate(nextProps) {
    return (
      (this.props.id !== nextProps.id) ||
      !deepEqual(this.props.messages, nextProps.messages)
    )
  }

  componentDidMount() {
    this.props.clearNewMessagesCount(this.props.id)
  }
  componentDidUpdate(prevProps) {
    this.props.clearNewMessagesCount(this.props.id)
  }

  render() {
    console.log("ChatroomContainer render")

    const { id, messages, currentUser } = this.props

    return (
      <div>
        <Chatroom messages={messages} id={id} currentUser={currentUser} />
      </div>
    )
  }
}

ChatroomContainer.propTypes = {
  id: PropTypes.string,
  messages: PropTypes.array,
  currentUser: PropTypes.object.isRequired,
  clearNewMessagesCount: PropTypes.func.isRequired
}

const mapStateToProps = (state, { params }) => ({
  id: params.id,
  messages: getChatroomMessages(state, params.id),
  currentUser: getCurrentUser(state)
})

export default withRouter(connect(mapStateToProps, { clearNewMessagesCount })(ChatroomContainer))
