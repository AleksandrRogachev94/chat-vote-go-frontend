import Validator from 'validator'

export function dataFromReject(fail) {
  if(Math.floor(fail.status / 100) === 4) {
    return { errors: fail.data.errors, isLoading: false }
  } else {
    return { errors: { other: "Error occured" }, isLoading: false }
  }
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
