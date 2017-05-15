import 'isomorphic-fetch'

export function userSignupRequest(userData) {
  return dispatch => {
    const request = new Request('/api/v1/signup', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      }),
      body: JSON.stringify({user: userData})
    });

    return fetch(request)
      .then(response => response.json()
        .then(data =>
          response.ok ? data : Promise.reject({status: response.status, data})
        )
      )
  }
}
