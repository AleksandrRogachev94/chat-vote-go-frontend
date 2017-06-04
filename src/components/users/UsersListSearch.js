import React from 'react'
import PropTypes from 'prop-types'
import UsersList from './UsersList'
import Error from '../common/Error'
import InputField from '../common/InputField'

class UsersListSearch extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      filteredUsers: [],
      filter: ''
    }

    this.handleChangeFilter = this.handleChangeFilter.bind(this)
  }

  handleChangeFilter(ev) {
    this.setState({
      filter: ev.target.value,
      filteredUsers: this.props.users.filter((user) =>
        user.nickname.toLowerCase().search(ev.target.value) > -1
      )
    })
  }

  render() {

    const { users, errors, isFetching } = this.props
    const { filter, filteredUsers } = this.state

    if(isFetching) {
      return (<p>Loading...</p>)
    } else {
      return (
        <div className="users-panel">
          {errors.other && <Error msg={errors.other.join(", ")} />}
          {errors.auth && <Error msg={errors.auth.join(", ")} />}
          <InputField name="searchUser" placeholder="Search" type="text" value={filter}
            onChange={this.handleChangeFilter} iconClass="glyphicon glyphicon-search" autoFocus={true} />
          {filteredUsers.length > 0 ? <UsersList users={filteredUsers} /> : <UsersList users={users} />}
        </div>
      )
    }
  }
}

UsersListSearch.propTypes = {
  users: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errors: PropTypes.object
}

export default UsersListSearch
