import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import Chatroom from './Chatroom'

class ChatroomContainer extends React.Component {

  render() {
    console.log("ChatroomContainer render")

    return (
      <p>ChatroomContainer</p>
    )
  }
}

export default ChatroomContainer
