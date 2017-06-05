import React from 'react';
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { logout } from '../actions/authActions'
import { addFlashMessage } from '../actions/flashMessages'
import { getIsAuthenticated, getCurrentUser } from '../reducers/index'

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
    const { isAuthenticated, currentUser } = this.props

    const userLinks = (
      <div>
        <ul className="nav navbar-nav">
          <li><Link to={`/users/${currentUser.id}`}>{currentUser.nickname}</Link></li>
          <li><Link to='/users'>Users</Link></li>
          <li><Link to='/chatrooms'>Chatrooms</Link></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#" onClick={this.logout}>Logout</a></li>
        </ul>
      </div>
    )

    const guestLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/signup'>Signup</Link></li>
      </ul>
    )

    return (
      <header>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>

              <Link to='/' className="navbar-brand" onlyActiveOnIndex>CVG</Link>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              {isAuthenticated ? userLinks : guestLinks}
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  isAuthenticated: getIsAuthenticated(state),
  currentUser: getCurrentUser(state)
})

export default connect(mapStateToProps, { logout, addFlashMessage })(Navbar)
