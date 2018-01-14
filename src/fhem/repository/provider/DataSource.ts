import Timestamp = require('../../value_object/Timestamp')
import ReadModelHistory = require('../../read_model/History')
import ReadModelCurrent = require('../../read_model/Current')

interface DataSource {
  loadCurrents (): Promise<ReadModelCurrent[]>

  loadHistories (from: Timestamp, to: Timestamp): Promise<ReadModelHistory[]>
}

export = DataSource
