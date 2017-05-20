import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addChatroom } from '../../actions/chatroomActions'
import PrimaryButton from '../common/PrimaryButton'

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
      <div className="content">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label has-text-centered">Create New Chat Room</label>
            <p className="control">
              <input className="input" type="text" placeholder="Title" value={this.state.title} onChange={this.handleChange} />
            </p>
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
