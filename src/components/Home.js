import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { getIsAuthenticated } from '../reducers/index'
import chat from '../../public/chat.png'
import vote from '../../public/vote.png'

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="home-logo">
          <h1>Welcome to<br/>Chat Vote Go</h1>
          {!this.props.isAuthenticated && <Link to="/signup" className="btn btn-primary">Join Now</Link>}
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isAuthenticated: getIsAuthenticated(state)
})

export default connect(mapStateToProps)(Home)
