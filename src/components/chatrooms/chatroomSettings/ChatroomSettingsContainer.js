import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, browserHistory } from 'react-router'
import deepEqual from 'deep-equal'
import { removeUserFromChatroom } from '../../../actions/userChatroomsActions'
import { deleteChatroom } from '../../../actions/chatroomActions'
import { addFlashMessage } from '../../../actions/flashMessages'
import { getChatroomOwner, getChatroomGuests, getCurrentUser, getChatroomErrors } from '../../../reducers/index'
import ChatroomUsers from './ChatroomUsers'
import AddUserToChatroom from './AddUserToChatroom'
import Error from '../../common/Error'

class ChatroomSettingsContainer extends React.Component {
  constructor(props) {
    super(props)

    this.handleRemoveUser = this.handleRemoveUser.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
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

  handleDelete(ev) {
    ev.preventDefault()
    if(confirm("Are you sure you want to delete this chatroom?")) {
      this.props.deleteChatroom(this.props.id)
        .then(() => {
          browserHistory.push('/chatrooms')
          this.props.addFlashMessage({ type: "success", text: "Sucessfully deleted chatroom" })
        })
        .catch(() => {})
    }
  }

  render() {
    console.log("ChatroomSettingsContainer render")
    const { owner, guests, currentUser, errors } = this.props

    return (
      <div>
        <h1>Settings</h1>
        <h3>Chatroom Users</h3>
        <ChatroomUsers owner={owner} guests={guests} currentUser={currentUser} handleRemove={this.handleRemoveUser} />
        <h3>Add User to Chatroom</h3>
        <AddUserToChatroom />
        {owner && currentUser.id === owner.id && (
          <div className="delete-chatroom"><button onClick={this.handleDelete} className="btn btn-danger">Delete Chatroom</button></div>
        )}
        {errors && errors.auth && <Error msg={errors.auth.join(", ")} />}
        {errors && errors.other && <Error msg={errors.other.join(", ")} />}
      </div>
    )
  }
}

ChatroomSettingsContainer.propTypes = {
  id: PropTypes.string,
  owner: PropTypes.object,
  guests: PropTypes.array,
  currentUser: PropTypes.object.isRequired,
  chatroomErrors: PropTypes.object
}

const mapStateToProps = (state, { params }) => ({
  id: params.id,
  owner: getChatroomOwner(state, params.id),
  guests: getChatroomGuests(state, params.id),
  currentUser: getCurrentUser(state),
  errors: getChatroomErrors(state)
})

export default withRouter(
  connect(mapStateToProps, { removeUserFromChatroom, deleteChatroom, addFlashMessage })(ChatroomSettingsContainer)
)
