const PORT_NUMBER = 3000

class Server {
  private expressApp: any

  /**
   * @param {Application} expressApp
   */
  constructor (expressApp: any) {
    this.expressApp = expressApp
  }

  /**
   * @param {null|int} port
   */
  listen (port: number) {
    this.expressApp.listen(port || PORT_NUMBER)
    console.log('todo list RESTful API Server started on: ' + port || PORT_NUMBER)
  }

  /**
   * @param {string} path
   * @param {Router} router
   */
  applyRouter (path: string, router: any) {
    this.expressApp.use(path, router)
  }
}

module.exports = Server
