import QueryParameter = require('./QueryParameter')
import Query = require('./Query')

class QueryBuilder {
  private _queryParameters: Array<QueryParameter>
  private _query: Query

  constructor (query: Query) {
    this._queryParameters = []
    this._query = query
  }

  /**
   * @param {QueryParameter} queryParameter
   */
  addQueryParameter (queryParameter: QueryParameter | null) {
    if (queryParameter === null) {
      return
    }

    this._queryParameters.push(queryParameter)
  }

  /**
   * @param {string} connectExpression probably AND or OR
   */
  buildPreparedStatement (connectExpression: string) {
    let query = this._query.query

    if (this._queryParameters.length > 0) {
      query += ' WHERE '

      const allParameters: Array<string> = this._queryParameters.map((queryParameter) => {
        let key: string = queryParameter.isKeyQuoted ? '`' + queryParameter.key + '`' : queryParameter.key

        return key + ' ' + queryParameter.comperator + ' ?'
      })

      query += allParameters.join(' ' + connectExpression + ' ')
    }

    return query
  }

  /**
   * @returns {string[]}
   */
  getParameters () {
    return this._queryParameters.map((queryParameter) => {
      return queryParameter.value
    })
  }
}

export = QueryBuilder
