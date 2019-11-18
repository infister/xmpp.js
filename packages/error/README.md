# error

XMPP error abstraction for JavaScript.

## Install

`npm install @xmpp-infister/error` or `yarn add @xmpp-infister/error`

## Usage

```js
const XMPPError = require('@xmpp-infister/error')

const error = new XMPPError('service-unavailable', 'optional text', element)
error instanceof Error // true
error.condition === 'service-unavailable' // true
error.text === 'service-unavailabe - optional text' // true
error.element === element // true
```
