# koa-session-auth

[![npm version](https://img.shields.io/npm/v/koa-session-auth.svg) ](https://www.npmjs.com/package/koa-session-auth) [![npm downloads](https://img.shields.io/npm/dt/koa-session-auth.svg)](https://npm-stat.com/charts.html?package=meteiot) [![Github All Releases](https://img.shields.io/github/downloads/godotdotdot/koa-session-auth/total.svg)](https://github.com/GoDotDotDot/MeteIOT/releases)


**This library is extends from [koa-session](https://github.com/koajs/session.).**

Simple session middleware for Koa. Defaults to cookie-based/token-based sessions and supports external stores.

Requires Node 7.6 or greater for async/await support

## Features

- [koa-session](https://github.com/koajs/session.) features
- token-based/cookie-based sessions (can be used simultaneously)

## Installation

```shell
$ npm install koa-session-auth
or
$ yarn add koa-session-auth
```

## Example

```javascript
const session = require('koa-session-auth');
const Koa = require('koa');
const app = new Koa();

app.keys = ['some secret hurr'];

const CONFIG = {
  useToken: true, /** (boolean) use token-session or not (default true) */
  useCookie: true, /** (boolean) use cookie-session or not (default true) */
  key: 'KoaToken', /** (string) cookie and token key (default is KoaToken) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

app.use(session(CONFIG, app));
// or if you prefer all default config, just use => app.use(session(app));

app.use(ctx => {
  // ignore favicon
  if (ctx.path === '/favicon.ico') return;

  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.body = n + ' views';
});

app.listen(3000);
console.log('listening on port 3000');
```

## Tips

When you use token-based sessions, please be careful with the key of the config and must be a valid HTTP header name. When you request the resource of server and  you want keep sessions,  you must be set HTTP header name that same as the key of the sessions config, like:

```javascript
request('http://localhost:3000',{
    headers:{
        KoaToken: 'eyJ2aWV3cyI6MSwiX2V4cGlyZSI' // read from local storage engine,like localStorage
    }
})
```

Cookie-based session, please skip.

## License

MIT