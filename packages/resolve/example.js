'use strict'

const resolve = require('./resolve')
// For you
// const resolve = require('@xmpp-infister/resolve')

resolve('jabberfr.org')
  .then(console.log)
  .catch(console.error)
