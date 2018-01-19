import QueryBuilder = require('./QueryBuilder')
import Query = require('./Query')

class QueryBuilderFactory {
  get (query: Query) {
    return new QueryBuilder(query)
  }
}

export = QueryBuilderFactory
