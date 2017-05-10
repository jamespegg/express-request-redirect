const fs = require('fs')
const yaml = require('js-yaml')

module.exports = function (redirects) {
  if (typeof redirects === 'string') {
    redirects = yaml.safeLoad(fs.readFileSync(redirects, 'utf8'))
  }

  return function redirect (req, res, next) {
    if (redirects !== undefined && redirects[req.url] !== undefined) {
      res.redirect(301, redirects[req.url])
    } else {
      next()
    }
  }
}
