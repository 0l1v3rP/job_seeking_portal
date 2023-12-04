class InvalidInputException extends Error {
  constructor(message, code) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
  }

  toString() {
    return `${this.name} (${this.code}): ${this.message}`;
  }
}

class PasswordsDontMatchException extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
  
  toString() {
    return `${this.name}: ${this.message}`;
  }
}

module.exports = {
  InvalidInputException,
  PasswordsDontMatchException
}