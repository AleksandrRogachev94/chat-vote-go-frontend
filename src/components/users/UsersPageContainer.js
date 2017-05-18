import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchUsers } from '../../actions/usersActions'
import { getUsersByTitle, getIsFetchingUsers, getUsersErrors } from '../../reducers/index'
import UsersPage from './UsersPage'

class UsersPageContainer extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUsers('all').then((res) => console.log(res))
  }

  render() {
    console.log("UsersPageContainer render")

    const { users, isFetching } = this.props

    return (
      <p></p>
    )
  }
}

UsersPageContainer.propTypes = {
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

export default connect(mapStateToProps, { fetchUsers })(UsersPageContainer)
