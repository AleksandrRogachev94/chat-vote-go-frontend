import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getUsersByTitle } from '../../../reducers/index'
import { addGuestToChatroom } from '../../../actions/userChatroomsActions'

class AddUserToChatroom extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user_id: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(ev) {
    this.setState({ user_id: ev.target.value })
  }

  handleSubmit(ev) {
    ev.preventDefault()
    this.props.addGuestToChatroom(this.state.user_id)
    this.setState({ user_id: '' })
  }

  render() {
    const options = this.props.allUsers.map(user => (
      <option key={user.id} value={user.id}>{user.nickname}</option>
    ))

    return (
      <div className="content">
        <h4>Add User to Chatroom</h4>

        <form onSubmit={this.handleSubmit} className="form-inline">
          <div className="form-group">
            <select name="user_id" value={this.state.user_id} onChange={this.handleChange} className="form-control">
              <option value="" disabled>Choose User</option>
              {options}
            </select>
          </div>
          <button type="submit" disabled={!this.state.user_id} className="btn btn-primary">Add</button>
        </form>
      </div>
    )
  }
}

AddUserToChatroom.propTypes = {
  allUsers: PropTypes.array.isRequired,
  addGuestToChatroom: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  allUsers: getUsersByTitle(state, 'all')
})

export default withRouter(connect(mapStateToProps, { addGuestToChatroom })(AddUserToChatroom))
