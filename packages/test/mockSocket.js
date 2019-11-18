'use strict'

const {EventEmitter} = require('@xmpp-infister/events')

class MockSocket extends EventEmitter {
  write(data, cb) {
    cb()
  }
}

module.exports = function mockSocket() {
  return new MockSocket()
}
