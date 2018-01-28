import DataSource = require('./provider/DataSource')
import Timestamp = require('../value_object/Timestamp')
import ReadModelHistory = require('../read_model/History')
import ReadModelCurrent = require('../read_model/Current')
import MySQL2 = require('mysql2/promise')
import QueryParameter = require('./mysql/QueryParameter')
import QueryBuilderFactory = require('./mysql/QueryBuilderFactory')
import Query = require('./mysql/Query')

interface ResultSet {
  TIMESTAMP: Date,
  DEVICE: string,
  TYPE: string,
  EVENT: string,
  READING: string,
  VALUE: string,
  UNIT: string
}

namespace FHEM.Repository {

  export class MySQL implements DataSource {
    private _connection: MySQL2.Pool
    private _queryBuilderFactory: QueryBuilderFactory

    /**
     * @param {Pool} connection
     * @param {QueryBuilderFactory} queryBuilderFactory
     */
    constructor (connection: MySQL2.Pool, queryBuilderFactory: QueryBuilderFactory) {
      this._connection = connection
      this._queryBuilderFactory = queryBuilderFactory
    }

    /**
     * @returns {Promise<ReadModelCurrent[]>}
     */
    async loadCurrents (): Promise<ReadModelCurrent[]> {
      let result: Array<ResultSet>
      let columns: Array<ResultSet>
      [result, columns] = await this._connection.execute('SELECT * FROM `current`') as Array<any>

      return result.map((result) => {
        return new ReadModelCurrent(result.TIMESTAMP.getTime(), result.DEVICE, result.TYPE, result.EVENT, result.READING, result.VALUE, result.UNIT)
      })
    }

    /**
     * @param {Timestamp} from
     * @param {Timestamp} to
     * @param {string | null} device
     * @param {string | null} reading
     * @returns {Promise<ReadModelHistory[]>}
     */
    async loadHistories (from: Timestamp, to: Timestamp, device: string | null, reading: string | null): Promise<ReadModelHistory[]> {
      const queryBuilder = this._queryBuilderFactory.get(new Query('SELECT * FROM `history`'))
      queryBuilder.addQueryParameter(from.getValue() ? new QueryParameter('UNIX_TIMESTAMP(TIMESTAMP)', from.toSeconds().toString(), '>=', false) : null)
      queryBuilder.addQueryParameter(to.getValue() ? new QueryParameter('UNIX_TIMESTAMP(TIMESTAMP)', to.toSeconds().toString(), '<=', false) : null)
      queryBuilder.addQueryParameter(device ? new QueryParameter('DEVICE', device, '=', false) : null)
      queryBuilder.addQueryParameter(reading ? new QueryParameter('READING', reading, '=', false) : null)

      let result: Array<ResultSet>
      let columns: Array<ResultSet>
      [result, columns] = await this._connection.execute(queryBuilder.buildPreparedStatement('AND'), queryBuilder.getParameters()) as Array<any>

      return result.map((result) => {
        return new ReadModelHistory(result.TIMESTAMP.getTime(), result.DEVICE, result.TYPE, result.EVENT, result.READING, result.VALUE, result.UNIT)
      })
    }

    /**
     * @param {string} device
     * @param {string} reading
     * @returns {Promise<ReadModelCurrent[]>}
     */
    async loadCurrentsByDeviceAndReading (device: string, reading?: string): Promise<ReadModelCurrent[]> {
      const queryBuilder = this._queryBuilderFactory.get(new Query('SELECT * FROM `current`'))
      queryBuilder.addQueryParameter(device ? new QueryParameter('DEVICE', device, '=', false) : null)
      queryBuilder.addQueryParameter(reading ? new QueryParameter('READING', reading, '=', false) : null)

      let result: Array<ResultSet>
      let columns: Array<ResultSet>
      [result, columns] = await this._connection.execute(queryBuilder.buildPreparedStatement('AND'), queryBuilder.getParameters()) as Array<any>

      return result.map((result) => {
        return new ReadModelCurrent(result.TIMESTAMP.getTime(), result.DEVICE, result.TYPE, result.EVENT, result.READING, result.VALUE, result.UNIT)
      })
    }
  }
}

export = FHEM.Repository.MySQL
