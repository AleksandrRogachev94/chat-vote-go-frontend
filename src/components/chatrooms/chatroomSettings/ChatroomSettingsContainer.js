import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import deepEqual from 'deep-equal'
import { removeUserFromChatroom } from '../../../actions/userChatroomsActions'
import { getChatroomOwner, getChatroomGuests, getCurrentUser } from '../../../reducers/index'
import ChatroomUsers from './ChatroomUsers'
import AddUserToChatroom from './AddUserToChatroom'

class ChatroomSettingsContainer extends React.Component {
  constructor(props) {
    super(props)

    this.handleRemoveUser = this.handleRemoveUser.bind(this)
  }

  // Selectors make some calculations with chatroom details. Same objects are not the same here
  shouldComponentUpdate(nextProps) {
    return (
      (this.props.id !== nextProps.id) ||
      !deepEqual(this.props.owner, nextProps.owner) ||
      !deepEqual(this.props.guests, nextProps.guests)
    )
  }

  handleRemoveUser(ev) {
    ev.preventDefault()
    this.props.removeUserFromChatroom(ev.target.dataset.user_id, this.props.id)
  }

  render() {
    console.log("ChatroomSettingsContainer render")
    const { owner, guests, currentUser } = this.props

    return (
      <div>
        <h1>Settings</h1>
        <h3>Chatroom Users</h3>
        <ChatroomUsers owner={owner} guests={guests} currentUser={currentUser} handleRemove={this.handleRemoveUser} />
        <h3>Add User to Chatroom</h3>
        <AddUserToChatroom />
      </div>
    )
  }
}

ChatroomSettingsContainer.propTypes = {
  id: PropTypes.string,
  owner: PropTypes.object,
  guests: PropTypes.array,
  currentUser: PropTypes.object.isRequired
}

const mapStateToProps = (state, { params }) => ({
  id: params.id,
  owner: getChatroomOwner(state, params.id),
  guests: getChatroomGuests(state, params.id),
  currentUser: getCurrentUser(state)
})

export default withRouter(
  connect(mapStateToProps, { removeUserFromChatroom })(ChatroomSettingsContainer)
)
