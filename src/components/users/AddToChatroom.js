import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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
    alert(this.state.chatroom_id)
    this.setState({ chatroom_id: '' })
  }

  render() {
    const options = this.props.allChatrooms.map(chatroom => (
      <option key={chatroom.id} value={chatroom.id}>{chatroom.title}</option>
    ))

    return (
      <div className="content">
        <h4 className="title is-4 has-text-centered">Add User to Chatroom</h4>

        <form onSubmit={this.handleSubmit}>
          <div className="field has-addons">
            <p className="control is-expanded">
              <span className="select is-fullwidth">
                <select name="chatroom_id" value={this.state.chatroom_id} onChange={this.handleChange}>
                  <option value="" disabled>Choose Chatroom</option>
                  {options}
                </select>
              </span>
            </p>
            <p className="control">
              <button type="submit" disabled={!this.state.chatroom_id} className="button is-primary">Add</button>
            </p>
          </div>
        </form>
      </div>
    )
  }
}

AddToChatroom.propTypes = {
  allChatrooms: PropTypes.array.isRequired
}

export default AddToChatroom
