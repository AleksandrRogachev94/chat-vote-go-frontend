import 'isomorphic-fetch'

export function login(credentials) {
  return dispatch => {
    const request = new Request('/api/v1/login', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      }),
      body: JSON.stringify({user: credentials})
    });

    return fetch(request)
      .then(response => response.json())
      .then(json => {
        localStorage.setItem('jwtToken', json.jwt)
      })
  }

}
