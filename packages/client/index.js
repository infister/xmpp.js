'use strict'

const {xml, jid, Client} = require('@xmpp-infister/client-core')
const getDomain = require('./lib/getDomain')

const _reconnect = require('@xmpp-infister/reconnect')
const _websocket = require('@xmpp-infister/websocket')
const _tcp = require('@xmpp-infister/tcp')
const _tls = require('@xmpp-infister/tls')
const _middleware = require('@xmpp-infister/middleware')
const _streamFeatures = require('@xmpp-infister/stream-features')
const _iqCaller = require('@xmpp-infister/iq/caller')
const _iqCallee = require('@xmpp-infister/iq/callee')
const _resolve = require('@xmpp-infister/resolve')

// Stream features - order matters and define priority
const _starttls = require('@xmpp-infister/starttls/client')
const _sasl = require('@xmpp-infister/sasl')
const _resourceBinding = require('@xmpp-infister/resource-binding')
const _sessionEstablishment = require('@xmpp-infister/session-establishment')

// SASL mechanisms - order matters and define priority
const scramsha1 = require('@xmpp-infister/sasl-scram-sha-1')
const plain = require('@xmpp-infister/sasl-plain')
const anonymous = require('@xmpp-infister/sasl-anonymous')

function client(options = {}) {
  const {resource, credentials, username, password, ...params} = options

  const {domain, service} = params
  if (!domain && service) {
    params.domain = getDomain(service)
  }

  const entity = new Client(params)

  const reconnect = _reconnect({entity})
  const websocket = _websocket({entity})
  const tcp = _tcp({entity})
  const tls = _tls({entity})

  const middleware = _middleware({entity})
  const streamFeatures = _streamFeatures({middleware})
  const iqCaller = _iqCaller({middleware, entity})
  const iqCallee = _iqCallee({middleware, entity})
  const resolve = _resolve({entity})
  // Stream features - order matters and define priority
  const starttls = _starttls({streamFeatures})
  const sasl = _sasl({streamFeatures}, credentials || {username, password})
  const resourceBinding = _resourceBinding({iqCaller, streamFeatures}, resource)
  const sessionEstablishment = _sessionEstablishment({iqCaller, streamFeatures})
  // SASL mechanisms - order matters and define priority
  const mechanisms = Object.entries({scramsha1, plain, anonymous}).map(
    ([k, v]) => ({[k]: v(sasl)})
  )

  return Object.assign(entity, {
    entity,
    reconnect,
    tcp,
    websocket,
    tls,
    middleware,
    streamFeatures,
    iqCaller,
    iqCallee,
    resolve,
    starttls,
    sasl,
    resourceBinding,
    sessionEstablishment,
    mechanisms,
  })
}

module.exports.xml = xml
module.exports.jid = jid
module.exports.client = client
