class Timestamp {
  private value: number

  constructor (value: number) {
    this.value = value
  }

  getValue (): number {
    return this.value
  }
}

export = Timestamp
