handleReject(fail) {
  if(Math.floor(fail.status / 100) === 4) {
    return { errors: fail.data.errors })
  } else {
    return setState({ errors: { other: "Error occured" } })
  }
}
