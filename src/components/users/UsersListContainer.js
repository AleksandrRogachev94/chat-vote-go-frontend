import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchUsers } from '../../actions/usersActions'
import { getUsersByTitle, getIsFetchingUsers, getUsersErrors } from '../../reducers/index'
import UsersList from './UsersList'

class UsersListContainer extends React.Component {

  componentDidMount() {
    this.props.fetchUsers('all').then((res) => console.log(res))
  }

  render() {
    console.log("UsersListContainer render")

    const { users, isFetching, errors } = this.props

    return (
      <UsersList users={users} isFetching={isFetching} errors={errors} />
    )
  }
}

UsersListContainer.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  users: getUsersByTitle(state, 'all'),
  isFetching: getIsFetchingUsers(state, 'all'),
  errors: getUsersErrors(state, 'all')
})

export default connect(mapStateToProps, { fetchUsers })(UsersListContainer)
