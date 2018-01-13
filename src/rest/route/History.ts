class RESTRouteHistory {
  /**
   * @param {Request} request
   * @param {Response} response
   */
  getList (request: any, response: any) {
    response.send('getList possible filter' + request.query.from + request.query.to)
  }
}

module.exports = RESTRouteHistory
