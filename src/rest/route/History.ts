import express = require('express')
import DataSource = require('../../fhem/repository/provider/DataSource')
import Timestamp = require('../../fhem/value_object/Timestamp')
import ReadModelHistory = require('../../fhem/read_model/History')

interface RequestGetList extends express.Request {
  params: {
    from: string,
    to: string
  },
  query: {
    device?: string,
    reading?: string
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
  async getList (request: RequestGetList, response: express.Response): Promise<void> {

    const histories: ReadModelHistory[] = await this.dataSource.loadHistories(
      new Timestamp(Number.parseFloat(request.params.from)),
      new Timestamp(Number.parseFloat(request.params.to))
    )

    response.send(histories.map(history => {
      return history
    }))
  }
}

export = RESTRouteHistory
