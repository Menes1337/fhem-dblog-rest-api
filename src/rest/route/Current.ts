import express = require('express')
import DataSource = require('../../fhem/repository/provider/DataSource')
import ReadModelCurrent = require('../../fhem/read_model/Current')

class RESTRouteCurrent {
  private dataSource: DataSource

  /**
   * @param {DataSource} dataSource
   */
  constructor (dataSource: DataSource) {
    this.dataSource = dataSource
  }

  /**
   * @param {express.Request} request
   * @param {express.Response} response
   */
  async getList (request: express.Request, response: express.Response): Promise<void> {
    let latestCurrents: ReadModelCurrent[] = []
    try {
      latestCurrents = await this.dataSource.loadCurrents()
    } catch (error) {
      console.log(error)
    }
    response.send(latestCurrents.map(current => {
      return current
    }))
  }

  /**
   * @param {express.Request} request
   * @param {express.Response} response
   */
  getByDeviceReading (request: express.Request, response: express.Response) {
    response.send('getByDeviceReading required parameter: ' + request.params.device + request.params.reading)
  }
}

export = RESTRouteCurrent
