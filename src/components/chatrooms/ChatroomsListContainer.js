import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchAllChatrooms } from '../../actions/chatroomsActions'
import { getChatroomsByTitle, getIsFetchingChatrooms, getChatroomsErrors } from '../../reducers/index'
// import UsersList from './UsersList'

class ChatroomsListContainer extends React.Component {

  componentDidMount() {
    this.props.fetchAllChatrooms()
  }

  render() {
    console.log("ChatroomsListContainer render")

    return (
      <p>ChatroomsListContainer</p>
    )
  }s
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
