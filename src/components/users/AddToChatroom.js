import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getAllChatrooms } from '../../reducers/index'
import { addGuestToChatroom } from '../../actions/userChatroomsActions'

class AddToChatroom extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      chatroom_id: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(ev) {
    this.setState({ chatroom_id: ev.target.value })
  }

  handleSubmit(ev) {
    ev.preventDefault()
    this.setState({ chatroom_id: '' })
    // alert(this.props.user_id)
    this.props.addGuestToChatroom(this.props.user_id, this.state.chatroom_id)
  }

  render() {
    const options = this.props.allChatrooms.map(chatroom => (
      <option key={chatroom.id} value={chatroom.id}>{chatroom.title}</option>
    ))

    return (
      <div className="content">
        <h4>Add User to Chatroom</h4>

        <form onSubmit={this.handleSubmit} className="form-inline">
          <div className="form-group">
            <div className="input-group">
              <select name="chatroom_id" value={this.state.chatroom_id} onChange={this.handleChange} className="form-control">
                <option value="" disabled>Choose Chatroom</option>
                {options}
              </select>
            </div>
          </div>
          <button type="submit" disabled={!this.state.chatroom_id} className="btn btn-primary">Add</button>
        </form>
      </div>
    )
  }
}

AddToChatroom.propTypes = {
  user_id: PropTypes.string.isRequired,
  allChatrooms: PropTypes.array.isRequired,
  addGuestToChatroom: PropTypes.func.isRequired
}

const mapStateToProps = (state, { params }) => ({
  user_id: params.id,
  allChatrooms: getAllChatrooms(state)
})

export default withRouter(connect(mapStateToProps, { addGuestToChatroom })(AddToChatroom))
