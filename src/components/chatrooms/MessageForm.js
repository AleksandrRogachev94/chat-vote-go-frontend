import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addMessage } from '../../actions/messagesActions'
import PrimaryButton from '../common/PrimaryButton'

class MessageForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      content: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(ev) {
    this.setState({
      content: ev.target.value
    })
  }

  handleSubmit(ev) {
    ev.preventDefault()
    this.setState({ content: '' })
    this.props.addMessage(this.props.chatroom_id, this.state)
  }

  render() {

    return (
      <div className="content">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label has-text-centered">Message</label>
            <p className="control">
              <textarea className="textarea" placeholder="Add Message" value={this.state.content} onChange={this.handleChange} />
            </p>
          </div>
          <PrimaryButton value="Send" disabled={!this.state.content} />
        </form>
      </div>
    )
  }
}

MessageForm.propTypes = {
  chatroom_id: PropTypes.string.isRequired,
  addMessage: PropTypes.func.isRequired
}

const mapStateToProps = (_, ownProps) => ({
  chatroom_id: ownProps.chatroom_id
})

export default connect(mapStateToProps, { addMessage })(MessageForm)
