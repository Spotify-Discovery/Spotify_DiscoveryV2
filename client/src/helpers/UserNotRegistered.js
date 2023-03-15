class UserNotRegistered extends Error {
  constructor() {
    super('User not registered in the Developer Dashboard');
  }
}

module.exports = UserNotRegistered;