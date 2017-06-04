import Validator from 'validator'
import 'isomorphic-fetch'

export const fetchWrapper = (request) =>
  fetch(request)
    .then(response => response.json()
      .then(
        data => (response.ok ? data : Promise.reject({status: response.status, data})),
        err => Promise.reject(response)
      )
  )

export function dataFromReject(fail, isUsingLoading) {
  let result = {}
  if(Math.floor(fail.status / 100) === 4) {
    result.errors = fail.data.errors
  } else {
    result.errors = { other: [`Error occured. Try again later (status code ${fail.status})`] }
  }

  if(isUsingLoading) result.isLoading = false
  return result
}

// Validations

export function validateEmail(email, errors) {
  if(Validator.isEmpty(email)) {
    errors.email = ["can't be blank"]
  }
  if(!Validator.isEmail(email)) {
    errors.email = ["you must use valid email format"]
  }
}

export function validateNickname(nickname, errors) {
  if(Validator.isEmpty(nickname)) {
    errors.nickname = ["can't be blank"]
  }
}

export function validatePassword(password, errors) {
  if(Validator.isEmpty(password)) {
    errors.password = ["can't be blank"]
  }
}

export function validatePasswordConfirmation(password_confirmation, password, errors) {
  if(Validator.isEmpty(password_confirmation)) {
    errors.password_confirmation = ["can't be blank"]
  }
  if(!Validator.equals(password, password_confirmation)) {
    errors.password_confirmation = ["must match password field"]
  }
}

// Formatting.
// Date in milliseconds.

export const formatDate = (date) => {
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const formatted = new Date(date)
  return `${month[formatted.getMonth()]} ${formatted.getDate()}, ${formatted.getFullYear()}`
}

// export const formatDateMessage = (date) => {
//   var options = {
//     weekday: "long", year: "numeric", month: "short",
//     day: "numeric", hour: "2-digit", minute: "2-digit"
//   };
//   const formatted = new Date(date)
//   return formatted.toLocaleTimeString("en-us", options)
// }

export const formatDateMessage = (date) => {
  var options = {
    hour: "2-digit", minute: "2-digit"
  };
  const formatted = new Date(date)
  return formatted.toLocaleTimeString("en-us", options)
}
