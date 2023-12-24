class InvalidInputException extends BaseException {
  constructor(message, code) {
    super(message, code);
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

class BaseException extends Error {
  constructor(message, code) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
  }

  toString() {
    return `${this.name} (${this.code}): ${this.message}`;
  }
}

export default {
  InvalidInputException,
  PasswordsDontMatchException,
  ValidationException
}