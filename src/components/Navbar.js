import React from 'react';
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { logout } from '../actions/authActions'
import { addFlashMessage } from '../actions/flashMessages'

class Navbar extends React.Component {

  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout(ev) {
    ev.preventDefault()
    this.props.logout()
    this.props.addFlashMessage({ type: 'success', text: 'You logged out successfully.' })
    browserHistory.push('/')
  }

  render() {
    const { isAuthenticated, user } = this.props.auth

    const userLinks = (
      <div>
        <Link to={`/users/${user.id}`}>{this.props.auth.user.email}</Link> |
        <a href="#" onClick={this.logout}>Logout</a>
      </div>
    )

    const guestLinks = (
      <div>
        <Link to='/login'>Login</Link> |
        <Link to='/signup'>Signup</Link>
      </div>
    )

    return (
      <div>
        <Link to='/'>Home</Link> |
        {isAuthenticated ? userLinks : guestLinks}
      </div>
    )
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout, addFlashMessage })(Navbar)
