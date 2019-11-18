'use strict'

const {client} = require('@xmpp-infister/client')
const Connection = require('@xmpp-infister/connection')
const context = require('./context')

module.exports = function(options) {
  const xmpp = client(options)
  xmpp.send = Connection.prototype.send
  const ctx = context(xmpp)
  return Object.assign(xmpp, ctx)
}
