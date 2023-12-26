class BaseException extends Error {
  constructor(message, code) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
  }

  toString() {
    return `${this.name}: ${this.message}`;
  }
}

class AuthorizationException extends BaseException {
  constructor(message, code, error) {
    super(message, code, error);
  } 
}

class InvalidInputException extends BaseException {
  constructor(message, code, error) {
    super(message, code, error);
  } 
}

class PasswordsDontMatchException extends BaseException {
  constructor(message, code) {
    super(message, code);
  }
}

class ValidationException extends BaseException {
  constructor(message, code) {
    super(message, code);
  }
}

class UnsuccessfullOperationException extends BaseException {
  constructor(message, code) {
    super(message, code);
  }
}

class UnseccessfullResultException extends BaseException {
  constructor(message, code) {
    super(message, code);
  }
}

class DatabaseErrorException extends BaseException {
  constructor(message, code) {
    super(message, code);
  }
}

module.exports = {
  InvalidInputException,
  PasswordsDontMatchException,
  ValidationException,
  DatabaseErrorException,
  UnseccessfullResultException,
  UnsuccessfullOperationException,
  AuthorizationException
}