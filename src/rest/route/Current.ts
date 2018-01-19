import express = require('express')
import DataSource = require('../../fhem/repository/provider/DataSource')
import ReadModelCurrent = require('../../fhem/read_model/Current')

interface RequestParameterDeviceReading extends express.Request {
  params: {
    device: string,
    reading?: string
  }
}

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
   * @param {RequestParameterDeviceReading} request
   * @param {express.Response} response
   */
  async getByDeviceReading (request: RequestParameterDeviceReading, response: express.Response) {
    let currents: ReadModelCurrent[] = []
    try {
      currents = await this.dataSource.loadCurrentsByDeviceAndReading(request.params.device, request.params.reading)
    } catch (error) {
      console.log(error)
    }
    response.send(currents.map(current => {
      return current
    }))
  }
}

export = RESTRouteCurrent
