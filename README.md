# Express Request Redirect [![Build Status](https://travis-ci.org/jamespegg/express-request-redirect.svg?branch=master)](https://travis-ci.org/jamespegg/express-request-redirect) [![Coverage Status](https://coveralls.io/repos/github/jamespegg/express-request-redirect/badge.svg?branch=master)](https://coveralls.io/github/jamespegg/express-request-redirect?branch=master)
Easy URL redirect configuration in Express 4.

## Installation
```sh
$ npm install --save express-request-redirect
```

## Usage
Express Request Redirect can be used in two ways; by passing in an object or by referencing a separate YAML configuration file.

Basic usage example;

```javascript
const express = require('express');
const redirect = require('express-request-redirect');

let app = express();
app.use(redirect({
  '/somewhere' : '/else'
}));
```

Using an seperate YAML file;

```javascript
const express = require('express');
const redirect = require('express-request-redirect');

let app = express();
app.use(redirect('redirects.yml'));
```

**redirects.yml**
```yaml
/somewhere: /else
/away-from: /here
```

## Issues
If you have any issues at all, [please open a new issue](https://github.com/jamespegg/express-request-redirect/issues).

## License

[Apache 2.0](LICENSE)
