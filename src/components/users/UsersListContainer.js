import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'
import { fetchUsers } from '../../actions/usersActions'
import { getUsersByTitle, getIsFetchingUsers, getUsersErrors } from '../../reducers/index'
import UsersListSearch from './UsersListSearch'

class UsersListContainer extends React.Component {

  componentDidMount() {
    this.props.fetchUsers('all')
  }

  // Fetching User (his profile) leads to unnecessary re-rendering.
  // We are interested only in id and nickname.
  shouldComponentUpdate(nextProps) {
    const { isFetching, errors, users } = this.props

    const checkUsers = (nextProps.users && users)  ?
      ! ((nextProps.users.length === users.length) &&
      nextProps.users.every((user, i) => (
        (user.id === users[i].id) && (user.nickname === users[i].nickname)
      )))
      : true

    return (
      nextProps.isFetching !== isFetching ||
      !deepEqual(nextProps.errors, errors) ||
      checkUsers
    )
  }

  render() {
    console.log("UsersListContainer render")

    const { users, isFetching, errors } = this.props

    return (
      <UsersListSearch users={users} isFetching={isFetching} errors={errors} />
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
