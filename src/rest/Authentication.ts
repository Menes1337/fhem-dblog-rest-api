const basicAuth = require('basic-auth')
import express = require('express')
const basicAuthCredentials = require('../../.basic-auth.credentials')

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
    if (authParameter && authParameter.name === basicAuthCredentials.username && authParameter.pass === basicAuthCredentials.password) {
      next()
    } else {
      response.status(403).send('Forbidden')
    }
  }
}

export = Authentication
