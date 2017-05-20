import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types';
import { fetchChatroom } from '../../actions/chatroomActions'
import { getFullChatroom, getIsFetchingChatroom, getChatroomErrors } from '../../reducers/index'
import Chatroom from './Chatroom'
import deepEqual from 'deep-equal'

class ChatroomContainer extends React.Component {

  componentDidMount() {
    const { fetchChatroom, id } = this.props
    if(id) {
      fetchChatroom(id)
    }
  }

  componentDidUpdate(prevProps) {
    // debugger
    const { fetchChatroom, id } = this.props
    if(id && prevProps.id !== id) {
      fetchChatroom(id)
    }
  }

  // Selectors make some calculations with chatroom. Same objects are not the same here
  shouldComponentUpdate(nextProps) {
    return (
      (this.props.isFetching !== nextProps.isFetching) ||
      (this.props.id !== nextProps.id) ||
      !deepEqual(this.props.errors, nextProps.errors) ||
      !deepEqual(this.props.chatroom, nextProps.chatroom)
    )
  }

  render() {
    console.log("ChatroomContainer render")

    const { id, chatroom, isFetching, errors } = this.props

    return (
      <div>
        <Chatroom chatroom={chatroom} id={id} isFetching={isFetching} errors={errors} />
      </div>
    )
  }
}

ChatroomContainer.propTypes = {
  id: PropTypes.string,
  chatroom: PropTypes.object,
  isFetching: PropTypes.bool,
  errors: PropTypes.object,
  fetchChatroom: PropTypes.func.isRequired
}

ChatroomContainer.defaultProps = {
  errors: {}
}

const mapStateToProps = (state, { params }) => ({
  id: params.id,
  chatroom: getFullChatroom(state, params.id),
  isFetching: getIsFetchingChatroom(state, params.id),
  errors: getChatroomErrors(state, params.id)
})

export default withRouter(connect(mapStateToProps, { fetchChatroom })(ChatroomContainer))
