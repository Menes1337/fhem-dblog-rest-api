class RESTRouteCurrent {
  /**
   * @param {Request} request
   * @param {Response} response
   */
  getList (request: any, response: any) {
    response.send('getList')
  }

  /**
   * @param {express.Request} request
   * @param {Response} response
   */
  getByDeviceReading (request: any, response: any) {
    response.send('getByDeviceReading required parameter: ' + request.params.device + request.params.reading)
  }
}

module.exports = RESTRouteCurrent
