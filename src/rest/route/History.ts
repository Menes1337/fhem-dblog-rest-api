import express = require('express')
import DataSource = require('../../fhem/repository/provider/DataSource')
import Timestamp = require('../../fhem/value_object/Timestamp')
import ReadModelHistory = require('../../fhem/read_model/History')

interface RequestGetList extends express.Request {
  query: {
    from: string,
    to: string
  }
}

class RESTRouteHistory {
  private dataSource: DataSource

  /**
   * @param {DataSource} dataSource
   */
  constructor (dataSource: DataSource) {
    this.dataSource = dataSource
  }

  /**
   * @param {RequestGetList} request
   * @param {express.Response} response
   */
  async getList (request: RequestGetList, response: express.Response) {

    const histories: ReadModelHistory[] = await this.dataSource.loadHistories(
      new Timestamp(Number.parseInt(request.query.from)),
      new Timestamp(Number.parseInt(request.query.to))
    )

    response.send(histories.map(history => {
      return history
    }))
  }
}

export = RESTRouteHistory
