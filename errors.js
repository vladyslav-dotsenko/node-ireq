'use strict';

class ExtendableError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else { 
      this.stack = (new Error(message)).stack; 
    }
  }
}

class NoBindBeforeInitError extends ExtendableError {
  constructor() {
    super('iReq: You must run `ireq.init(path)` before binding modules');
  }  
}

class NoCallBeforeInitError extends ExtendableError {
  constructor() {
    super('iReq: You must run `ireq.init(path)` before requiring anything');
  }
}

class BindToExistingError extends ExtendableError {
  constructor(module) {
    super(`iReq: Can't bind module "${module}", property already exists`);
  }
}

class BindPathError extends ExtendableError {
  constructor(module) {
    super(`iReq: Can't bind module "${module}", 'path' must start with / (slash)`);
  } 
}

class NoBindingError extends ExtendableError {
  constructor(module) {
    super(`iReq: Can't get module "${module}", no binding found`);
  }
}

module.exports = {
  NoBindBeforeInitError,
  NoCallBeforeInitError,
  NoBindingError,
  BindToExistingError,
  BindPathError,
};
