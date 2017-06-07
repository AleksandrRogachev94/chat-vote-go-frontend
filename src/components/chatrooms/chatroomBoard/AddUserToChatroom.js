import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getUsersByTitle, getChatroomGuests, getCurrentUser } from '../../../reducers/index'
import { addUserToChatroom } from '../../../actions/userChatroomsActions'

class AddUserToChatroom extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user_id: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    window.jQuery('.selectpicker').selectpicker();
  }

  componentDidUpdate() {
    window.jQuery('.selectpicker').selectpicker('refresh');
  }

  handleChange(ev) {
    this.setState({ user_id: ev.target.value })
  }

  handleSubmit(ev) {
    ev.preventDefault()
    this.props.addUserToChatroom(this.state.user_id)
    this.setState({ user_id: '' })
  }

  render() {
    const { currentUser, guests, allUsers } = this.props

    const options = allUsers.filter((user) =>
      user.id !== currentUser.id && !guests.map(user => user.id).includes(user.id))
      .map(user => (
      <option key={user.id} value={user.id}>{user.nickname}</option>
    ))

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row" style={{margin: '1em'}}>
          <div className="col-xs-12">
            <div className="input-group input-group-md">
              <select name="user_id" value={this.state.user_id} onChange={this.handleChange} className="form-control selectpicker"
                data-live-search="true">
                <option value="" disabled>Choose User</option>
                {options}
              </select>

              <div className="input-group-btn">
                <button type="submit" disabled={!this.state.user_id} className="btn btn-primary">Add</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

AddUserToChatroom.propTypes = {
  allUsers: PropTypes.array.isRequired,
  addUserToChatroom: PropTypes.func.isRequired,
  guests: PropTypes.array,
  currentUser: PropTypes.object.isRequired
}

const mapStateToProps = (state, {params}) => ({
  allUsers: getUsersByTitle(state, 'all'),
  guests: getChatroomGuests(state, params.id),
  currentUser: getCurrentUser(state)
})

export default withRouter(connect(mapStateToProps, { addUserToChatroom })(AddUserToChatroom))
