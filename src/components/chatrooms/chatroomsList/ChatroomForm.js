import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addChatroom } from '../../../actions/chatroomActions'
import PrimaryButton from '../../common/PrimaryButton'

class ChatroomForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(ev) {
    this.setState({
      title: ev.target.value
    })
  }

  handleSubmit(ev) {
    ev.preventDefault()
    this.setState({ title: '' })
    this.props.addChatroom(this.state)
  }

  render() {

    return (
      <div>
        <h4 style={{textAlign: 'center'}}>Create New Chatroom</h4>
        <form onSubmit={this.handleSubmit} className="form-inline">
          <div className="form-group">
            <input className="form-control" type="text" placeholder="Title" value={this.state.title} onChange={this.handleChange} />
          </div>
          <PrimaryButton value="Create" disabled={!this.state.title} />
        </form>
      </div>
    )
  }
}

ChatroomForm.propTypes = {
  addChatroom: PropTypes.func.isRequired
}

export default connect(null, { addChatroom })(ChatroomForm)
