'use strict'

const {Client} = require('../client-core')
const JID = require('@xmpp-infister/jid')
const mockSocket = require('./mockSocket')

module.exports = function client(entity = new Client()) {
  entity.socket = mockSocket()
  entity.jid = new JID('foo@bar/test')
  return entity
}
