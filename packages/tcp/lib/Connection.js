'use strict'

const Connection = require('@xmpp-infister/connection-tcp')

class ConnectionTCP extends Connection {
  socketParameters(service) {
    const params = super.socketParameters(service)
    if (!params) return params
    params.port = params.port || 5222
    return params
  }
}

ConnectionTCP.prototype.NS = 'jabber:client'

module.exports = ConnectionTCP
