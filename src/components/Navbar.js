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
      <div className="nav-right nav-menu">
        <Link to={`/users/${user.id}`}
              className="nav-item is-tab"
              activeClassName="is-active">
          {this.props.auth.user.email}
        </Link>
        <a href="#" className="nav-item is-tab" onClick={this.logout}>Logout</a>
      </div>
    )

    const guestLinks = (
      <div className="nav-right nav-menu">
        <Link to='/login' className="nav-item is-tab" activeClassName="is-active">Login</Link>
        <Link to='/signup' className="nav-item is-tab" activeClassName="is-active">Signup</Link>
      </div>
    )

    return (
      <nav className="nav has-shadow">
        <div className="nav-left">
          <Link to='/' className="nav-item is-tab" onlyActiveOnIndex activeClassName="is-active">Home</Link>
        </div>
        {isAuthenticated ? userLinks : guestLinks}
      </nav>
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
