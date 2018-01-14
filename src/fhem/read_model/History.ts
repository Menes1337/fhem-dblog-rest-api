class ReadModelHistory {
  public timestamp: number
  public device: string
  public type: string
  public event: string
  public reading: string
  public value: string
  public unit: string

  constructor (timestamp: number, device: string, type: string, event: string, reading: string, value: string, unit: string) {
    this.timestamp = timestamp
    this.device = device
    this.type = type
    this.event = event
    this.reading = reading
    this.value = value
    this.unit = unit
  }
}

export = ReadModelHistory
