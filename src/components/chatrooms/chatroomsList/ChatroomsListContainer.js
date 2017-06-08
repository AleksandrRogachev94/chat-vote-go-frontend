import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'
import { fetchAllChatrooms } from '../../../actions/chatroomsActions'
import { getChatroomsByTitle, getIsFetchingChatrooms, getChatroomsErrors } from '../../../reducers/index'
import ChatroomsList from './ChatroomsList'

class ChatroomsListContainer extends React.Component {

  componentDidMount() {
    this.props.fetchAllChatrooms()
  }

  // Fetching Chatroom (its full info) leads to unnecessary re-rendering.
  // We are interested only in id and title.
  shouldComponentUpdate(nextProps) {
    const { isFetching, errors, own_chatrooms, guest_chatrooms } = this.props

    const checkOwn = (nextProps.own_chatrooms && own_chatrooms)  ?
      ! ((nextProps.own_chatrooms.length === own_chatrooms.length) &&
      nextProps.own_chatrooms.every((ch, i) => (
        (ch.id === own_chatrooms[i].id) && (ch.title === own_chatrooms[i].title)
      )))
      : true

    const checkGuest = (nextProps.guest_chatrooms && guest_chatrooms)  ?
      ! ((nextProps.guest_chatrooms.length === guest_chatrooms.length) &&
      nextProps.guest_chatrooms.every((ch, i) => (
        (ch.id === guest_chatrooms[i].id) && (ch.title === guest_chatrooms[i].title)
      )))
      : true

    return (
      nextProps.isFetching !== isFetching ||
      !deepEqual(nextProps.errors, errors) ||
      checkOwn || checkGuest
    )
  }

  render() {
    const { own_chatrooms, guest_chatrooms, isFetching, errors } = this.props

    return (
      <ChatroomsList own_chatrooms={own_chatrooms} guest_chatrooms={guest_chatrooms} isFetching={isFetching} errors={errors}  />
    )
  }
}

ChatroomsListContainer.propTypes = {
  fetchAllChatrooms: PropTypes.func.isRequired,
  guest_chatrooms: PropTypes.array.isRequired,
  own_chatrooms: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  own_chatrooms: getChatroomsByTitle(state, 'own'),
  guest_chatrooms: getChatroomsByTitle(state, 'guest'),
  isFetching: getIsFetchingChatrooms(state, 'own') || getIsFetchingChatrooms(state, 'guest'),
  errors: Object.assign({}, getChatroomsErrors(state, 'own'), getChatroomsErrors(state, 'guest'))
})

export default connect(mapStateToProps, { fetchAllChatrooms })(ChatroomsListContainer)
