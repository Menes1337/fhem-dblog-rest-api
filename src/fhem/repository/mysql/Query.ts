class Query {
  private _query: string

  /**
   * @param {string} query
   */
  constructor (query: string) {
    this._query = query
  }

  /**
   * @returns {string}
   */
  get query (): string {
    return this._query
  }
}

export = Query
