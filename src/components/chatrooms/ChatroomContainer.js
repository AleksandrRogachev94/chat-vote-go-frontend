import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types';
import { fetchChatroom } from '../../actions/chatroomActions'
import { getFullChatroom, getIsFetchingChatroom, getChatroomErrors } from '../../reducers/index'
import Chatroom from './Chatroom'

class ChatroomContainer extends React.Component {

  componentDidMount() {
    const { fetchChatroom, id } = this.props
    if(id) {
      fetchChatroom(id)
    }
  }

  componentDidUpdate(prevProps) {
    const { fetchChatroom, id } = this.props
    if(id && prevProps.id !== id) {
      fetchChatroom(id)
    }
    // if(id && (!user || !user.email))
    // if(!this.props.profile || !prevProps.profile || (this.props.profile.profile.id !== prevProps.profile.profile.id)) {
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
