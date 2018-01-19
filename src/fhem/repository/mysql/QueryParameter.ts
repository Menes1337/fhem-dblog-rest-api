class QueryParameter {
  private _key: string
  private _value: string
  private _comperator: string
  private _isKeyQuoted: boolean

  constructor (key: string, value: string, comperator: string, isKeyQuoted: boolean = true) {
    this._key = key
    this._value = value
    this._comperator = comperator
    this._isKeyQuoted = isKeyQuoted
  }

  get key (): string {
    return this._key
  }

  get value (): string {
    return this._value
  }

  get comperator (): string {
    return this._comperator
  }

  get isKeyQuoted (): boolean {
    return this._isKeyQuoted
  }
}

export = QueryParameter
