import React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { logout } from '../actions/authActions'

class Navbar extends React.Component {

  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout(ev) {
    ev.preventDefault()
    this.props.logout()
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
  logout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)
