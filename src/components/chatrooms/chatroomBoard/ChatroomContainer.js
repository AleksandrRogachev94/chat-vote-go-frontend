import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'
import { removeUserFromChatroom } from '../../../actions/userChatroomsActions'
import { getChatroomMessages, getChatroomOwner, getChatroomGuests, getCurrentUser } from '../../../reducers/index'
import Chatroom from './Chatroom'

class ChatroomContainer extends React.Component {

  constructor(props) {
    super(props)
    this.handleRemoveUser = this.handleRemoveUser.bind(this)
  }

  // Selectors make some calculations with chatroom details. Same objects are not the same here
  shouldComponentUpdate(nextProps) {
    return (
      (this.props.id !== nextProps.id) ||
      !deepEqual(this.props.owner, nextProps.owner) ||
      !deepEqual(this.props.guests, nextProps.guests) ||
      !deepEqual(this.props.messages, nextProps.messages)
    )
  }

  handleRemoveUser(ev) {
    ev.preventDefault()
    this.props.removeUserFromChatroom(ev.target.dataset.user_id, this.props.id)
  }

  render() {
    console.log("ChatroomContainer render")

    const { id, messages, owner, guests, currentUser } = this.props

    return (
      <div>
        <Chatroom messages={messages} owner={owner} guests={guests}
          id={id} currentUser={currentUser} handleRemoveUser={this.handleRemoveUser} />
      </div>
    )
  }
}

ChatroomContainer.propTypes = {
  id: PropTypes.string,
  messages: PropTypes.array,
  owner: PropTypes.object,
  guests: PropTypes.array,
  currentUser: PropTypes.object.isRequired
}

const mapStateToProps = (state, { params }) => ({
  id: params.id,
  messages: getChatroomMessages(state, params.id),
  owner: getChatroomOwner(state, params.id),
  guests: getChatroomGuests(state, params.id),
  currentUser: getCurrentUser(state)
})

export default withRouter(
  connect(mapStateToProps, { removeUserFromChatroom })(ChatroomContainer)
)
