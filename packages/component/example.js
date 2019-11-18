/* eslint-disable node/no-extraneous-require */

'use strict'

const {component, xml} = require('@xmpp-infister/component')
const debug = require('@xmpp-infister/debug')

const xmpp = component({
  service: 'xmpp://localhost:5347',
  domain: 'component.localhost',
  password: 'mysecretcomponentpassword',
})

debug(xmpp, true)

xmpp.on('offline', () => {
  console.log('⏹', 'offline')
})

xmpp.on('stanza', async stanza => {
  if (stanza.is('message')) {
    await xmpp.stop()
  }
})

xmpp.on('online', async address => {
  console.log('▶', 'online as', address.toString())

  // Sends a chat message to itself
  const message = xml(
    'message',
    {type: 'chat', to: address},
    xml('body', null, 'hello world')
  )
  await xmpp.send(message)
})

xmpp.start().catch(console.error)
