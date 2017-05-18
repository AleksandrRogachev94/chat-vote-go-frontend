import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchUsers } from '../../actions/usersActions'
import UsersPage from './UsersPage'

class UsersPageContainer extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUsers().then((res) => console.log(res))
  }

  render() {
    console.log("UsersPageContainer render")
    return (
      <UsersPage />
    )
  }
}

UsersPageContainer.propTypes = {
  fetchUsers: PropTypes.func.isRequired
}

export default connect(null, { fetchUsers })(UsersPageContainer)
