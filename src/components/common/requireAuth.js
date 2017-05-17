import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { addFlashMessage } from '../../actions/flashMessages'

export default function(ComposedComponent) {
  class Authenticate extends React.Component {

    componentWillMount() {
      if(!this.props.isAuthenticated) {

        this.props.addFlashMessage({
          type: 'error',
          text: 'You need to login to access this page'
        })

        browserHistory.push('/login')
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.isAuthenticated) {
        browserHistory.push('/')
      }
    }

    render() {
      if(this.props.isAuthenticated) {
        return (<ComposedComponent {...this.props} />)
      } else {
        return (<p>Redirecting...</p>)
      }
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
  })

  return connect(mapStateToProps, { addFlashMessage })(Authenticate)
}
