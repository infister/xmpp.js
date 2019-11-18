'use strict'

const {Component, xml, jid} = require('@xmpp-infister/component-core')

const _reconnect = require('@xmpp-infister/reconnect')
const _middleware = require('@xmpp-infister/middleware')
const _iqCaller = require('@xmpp-infister/iq/caller')
const _iqCallee = require('@xmpp-infister/iq/callee')

function component(options) {
  const {password, service, domain} = options

  const entity = new Component({service, domain})

  const reconnect = _reconnect({entity})
  const middleware = _middleware({entity})
  const iqCaller = _iqCaller({entity, middleware})
  const iqCallee = _iqCallee({entity, middleware})

  entity.on('open', async el => {
    try {
      const {id} = el.attrs
      if (typeof password === 'function') {
        await password(creds => entity.authenticate(id, creds))
      } else {
        await entity.authenticate(id, password)
      }
    } catch (err) {
      entity.emit('error', err)
    }
  })

  return Object.assign(entity, {
    entity,
    reconnect,
    middleware,
    iqCaller,
    iqCallee,
  })
}

module.exports.xml = xml
module.exports.jid = jid
module.exports.component = component
