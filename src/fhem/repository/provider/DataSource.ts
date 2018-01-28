import Timestamp = require('../../value_object/Timestamp')
import ReadModelHistory = require('../../read_model/History')
import ReadModelCurrent = require('../../read_model/Current')

interface DataSource {
  loadCurrents (): Promise<ReadModelCurrent[]>

  loadCurrentsByDeviceAndReading (device: string, reading?: string): Promise<ReadModelCurrent[]>

  loadHistories (from: Timestamp, to: Timestamp, device: string | null, reading: string | null): Promise<ReadModelHistory[]>
}

export = DataSource
