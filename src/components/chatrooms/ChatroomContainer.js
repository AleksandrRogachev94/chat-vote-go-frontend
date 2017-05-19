import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types';
import { fetchChatroom } from '../../actions/chatroomActions'

class ChatroomContainer extends React.Component {

  componentDidMount() {
    const { fetchChatroom, id } = this.props
    if(id) {
      fetchChatroom(id)
    }
  }

  componentDidUpdate(prevProps) {
    const { fetchChatroom, id } = this.props
    // if !chatroom or prevProps.chatroom.id !== this.props.chatroom.id
    if(id) {
      fetchChatroom(id)
    }
  }

  render() {
    console.log("ChatroomContainer render")

    return (
      <div>
        <p>Hello World</p>
      </div>
    )
  }
}

ChatroomContainer.propTypes = {
  id: PropTypes.string,
  fetchChatroom: PropTypes.func.isRequired
}

ChatroomContainer.defaultProps = {
  errors: {}
}

const mapStateToProps = (state, { params }) => ({
  id: params.id
})

export default withRouter(connect(mapStateToProps, { fetchChatroom })(ChatroomContainer))
