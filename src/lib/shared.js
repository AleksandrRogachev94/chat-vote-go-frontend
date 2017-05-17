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
