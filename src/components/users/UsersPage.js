import React from 'react'
import PropTypes from 'prop-types'

const UsersPage = (props) => {
  console.log("UsersPage render")

  const { isFetching } = props
  if(isFetching) {
    return <p>Loading...</p>
  } else {
    return (
      <h1 className="title">Users Page</h1>
    )
  }
}

UsersPage.propTypes = {
  isFetching: PropTypes.bool.isRequired
}

export default UsersPage
