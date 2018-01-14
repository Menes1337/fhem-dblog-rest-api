import express = require('express')

const PORT_NUMBER = 3000

class Server {
  private expressApp: express.Application

  /**
   * @param {express.Application} expressApp
   */
  constructor (expressApp: express.Application) {
    this.expressApp = expressApp
  }

  /**
   * @param {null|number} port
   */
  listen (port: number | null) {
    this.expressApp.listen(port || PORT_NUMBER)
    console.log('todo list RESTful API Server started on: ' + port || PORT_NUMBER)
  }

  /**
   * @param {string} path
   * @param {express.Router} router
   */
  applyRouter (path: string, router: express.Router) {
    this.expressApp.use(path, router)
  }
}

export = Server
