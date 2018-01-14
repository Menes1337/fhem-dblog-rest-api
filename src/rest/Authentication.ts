const basicAuth = require('basic-auth')
import express = require('express')

interface AuthParameter {
  name?: string,
  pass?: string
}

class Authentication {
  /**
   * @param {express.Request} request
   * @param {express.Response} response
   * @param {express.next} next
   */
  authenticate (request: express.Request, response: express.Response, next: express.NextFunction): void {
    const authParameter: AuthParameter = basicAuth(request)
    if (authParameter && authParameter.name === 'myUser' && authParameter.pass === 'myPass') {
      next()
    } else {
      response.status(403).send('Forbidden')
    }
  }
}

export = Authentication
