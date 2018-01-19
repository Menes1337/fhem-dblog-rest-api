class Timestamp {
  private value: number

  /**
   * @param {number} value
   */
  constructor (value: number) {
    this.value = value
  }

  /**
   * @returns {number}
   */
  getValue (): number {
    return this.value
  }

  /**
   * @returns {number}
   */
  toSeconds () {
    return this.value / 1000
  }
}

export = Timestamp
