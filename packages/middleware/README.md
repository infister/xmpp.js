# middleware

Middleware for `@xmpp-infister/client` and `@xmpp-infister/component`.

Supports Node.js and browsers.

## Install

```
npm install @xmpp-infister/middleware
```

## Usage

```js
const {Client} = require('@xmpp-infister/client')
const middleware = require('@xmpp-infister/middlware')

const client = new Client()
const app = middleware({entity: client})
```

### use

The `use` method registers a middleware for incoming stanzas.

```js
app.use((ctx, next) => {})
```

### filter

The `filter` method registers a middleware for outgoing stanzas.

```js
app.filter((ctx, next) => {})
```
