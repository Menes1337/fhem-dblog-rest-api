import Timestamp = require('../value_object/Timestamp')
import ReadModelCurrent = require('../read_model/Current')

class Current {
  private _timestamp: Timestamp
  private _device: string
  private _type: string
  private _event: string
  private _reading: string
  private _value: string
  private _unit: string

  /**
   * @param {Timestamp} timestamp
   * @param {string} device
   * @param {string} type
   * @param {string} event
   * @param {string} reading
   * @param {string} value
   * @param {string} unit
   */
  constructor (timestamp: Timestamp, device: string, type: string, event: string, reading: string, value: string, unit: string) {
    this._timestamp = timestamp
    this._device = device
    this._type = type
    this._event = event
    this._reading = reading
    this._value = value
    this._unit = unit
  }

  get timestamp (): Timestamp {
    return this._timestamp
  }

  get device (): string {
    return this._device
  }

  get type (): string {
    return this._type
  }

  get event (): string {
    return this._event
  }

  get reading (): string {
    return this._reading
  }

  get value (): string {
    return this._value
  }

  get unit (): string {
    return this._unit
  }

  toReadModel (): ReadModelCurrent {
    return new ReadModelCurrent(
      this.timestamp.getValue(),
      this.device,
      this.type,
      this.event,
      this.reading,
      this.value,
      this.unit
    )
  }
}

export = Current
