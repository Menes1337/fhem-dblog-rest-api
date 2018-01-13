const basicAuth = require('basic-auth')

class Authentication {
  /**
   * @param {express.Request} request
   * @param {express.Response} response
   * @param {express.next} next
   */
  authenticate (request: any, response: any, next: any) {
    const authParameter = basicAuth(request)
    if (authParameter && authParameter.name === 'myUser' && authParameter.pass === 'myPass') {
      next()
    } else {
      response.status(403).send('Forbidden')
    }
  }
}

export {}

module.exports = Authentication
