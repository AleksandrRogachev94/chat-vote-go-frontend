import Validator from 'validator'
import isEmpty from 'lodash/isEmpty';

export function handleReject(fail) {
  if(Math.floor(fail.status / 100) === 4) {
    return { errors: fail.data.errors }
  } else {
    return { errors: { other: "Error occured" } }
  }
}

export function validateSignup(data) {
  let errors = {}

  if(Validator.isEmpty(data.email)) {
    errors.email = ["can't be blank"]
  }

  if(Validator.isEmail(data.email)) {
    errors.email = ["you must use valid email format"]
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = ["can't be blank"]
  }

  if(Validator.isEmpty(data.password_confirmation)) {
    errors.password_confirmation = ["can't be blank"]
  }

  if(!Validator.equals(data.password, data.password_confirmation)) {
    errors.password_confirmation = ["must match password field"]
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
