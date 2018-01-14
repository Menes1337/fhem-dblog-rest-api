import DataSource = require('./provider/DataSource')
import Timestamp = require('../value_object/Timestamp')
import ReadModelHistory = require('../read_model/History')
import ReadModelCurrent = require('../read_model/Current')
import MySQL2 = require('mysql2/promise')

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
    private connection: MySQL2.Connection

    constructor (connection: MySQL2.Connection) {
      this.connection = connection
    }

    async loadCurrents (): Promise<ReadModelCurrent[]> {
      let result: Array<ResultSet>
      let columns: Array<ResultSet>
      [result, columns] = await this.connection.execute('SELECT * FROM `current`') as Array<any>

      return result.map((result) => {
        return new ReadModelCurrent(result.TIMESTAMP.getTime(), result.DEVICE, result.TYPE, result.EVENT, result.READING, result.VALUE, result.UNIT)
      })
    }

    async loadHistories (from: Timestamp, to: Timestamp): Promise<ReadModelHistory[]> {
      let result: Array<ResultSet>
      let columns: Array<ResultSet>
      [result, columns] = await this.connection.execute(
        'SELECT * FROM history WHERE TIMESTAMP >= ? AND TIMESTAMP <= ?',
        [from.getValue().toString(), to.getValue().toString()]
      ) as Array<any>

      return result.map((result) => {
        return new ReadModelHistory(result.TIMESTAMP.getTime(), result.DEVICE, result.TYPE, result.EVENT, result.READING, result.VALUE, result.UNIT)
      })
    }
  }

}

export = FHEM.Repository.MySQL
