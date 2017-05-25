import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'
import { getChatroomMessages, getChatroomOwner, getChatroomGuests,
  getIsFetchingChatroom, getChatroomErrors } from '../../../reducers/index'
import Chatroom from './Chatroom'

class ChatroomContainer extends React.Component {

  // Selectors make some calculations with chatroom details. Same objects are not the same here
  shouldComponentUpdate(nextProps) {
    return (
      (this.props.isFetching !== nextProps.isFetching) ||
      (this.props.id !== nextProps.id) ||
      !deepEqual(this.props.errors, nextProps.errors) ||
      !deepEqual(this.props.owner, nextProps.owner) ||
      !deepEqual(this.props.guests, nextProps.guests) ||
      !deepEqual(this.props.messages, nextProps.messages)
    )
  }

  render() {
    console.log("ChatroomContainer render")

    const { id, messages, owner, guests, isFetching, errors } = this.props

    return (
      <div>
        <Chatroom messages={messages} owner={owner} guests={guests}
          id={id} isFetching={isFetching} errors={errors} />
      </div>
    )
  }
}

ChatroomContainer.propTypes = {
  id: PropTypes.string,
  messages: PropTypes.array,
  owner: PropTypes.object,
  guests: PropTypes.array,
  isFetching: PropTypes.bool,
  errors: PropTypes.object
}

ChatroomContainer.defaultProps = {
  errors: {}
}

const mapStateToProps = (state, { params }) => ({
  id: params.id,
  messages: getChatroomMessages(state, params.id),
  owner: getChatroomOwner(state, params.id),
  guests: getChatroomGuests(state, params.id),
  isFetching: getIsFetchingChatroom(state, params.id),
  errors: getChatroomErrors(state, params.id)
})

export default withRouter(
  connect(mapStateToProps)(ChatroomContainer)
)
