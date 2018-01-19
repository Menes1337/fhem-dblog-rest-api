import assert = require('assert')
import QueryBuilder = require('../../../../../src/fhem/repository/mysql/QueryBuilder')
import Query = require('../../../../../src/fhem/repository/mysql/Query')
import QueryParameter = require('../../../../../src/fhem/repository/mysql/QueryParameter')

describe('QueryBuilder', () => {
  describe('BuildPreparedStatement', () => {
    it('should just return the query if there are no queryParameters passed', () => {
      const queryBuilder: QueryBuilder = new QueryBuilder(new Query('SELECT * FROM test'))

      assert.equal('SELECT * FROM test', queryBuilder.buildPreparedStatement(''))
    })

    it('should just return the query and the query parameter', () => {
      const queryBuilder: QueryBuilder = new QueryBuilder(new Query('SELECT * FROM test'))
      queryBuilder.addQueryParameter(new QueryParameter('TABLE_KEY_NAME', 'some value', '=', false))

      assert.deepEqual(['some value'], queryBuilder.getParameters())
      assert.equal('SELECT * FROM test WHERE TABLE_KEY_NAME = ?', queryBuilder.buildPreparedStatement('AND'))
    })

    it('should just return the query and the query key value in quotes', () => {
      const queryBuilder: QueryBuilder = new QueryBuilder(new Query('SELECT * FROM TABLE'))
      queryBuilder.addQueryParameter(new QueryParameter('TABLE_KEY_NAME', 'some value', '=', true))

      assert.deepEqual(['some value'], queryBuilder.getParameters())
      assert.equal('SELECT * FROM TABLE WHERE `TABLE_KEY_NAME` = ?', queryBuilder.buildPreparedStatement('AND'))
    })

    it('should just return the query and the query parameters connected with an AND', () => {
      const queryBuilder: QueryBuilder = new QueryBuilder(new Query('SELECT * FROM test'))
      queryBuilder.addQueryParameter(new QueryParameter('TABLE_KEY_NAME', 'some value', '=', true))
      queryBuilder.addQueryParameter(new QueryParameter('ANOTHER_TABLE_KEY_NAME', 'another value', '=', false))

      assert.deepEqual(['some value', 'another value'], queryBuilder.getParameters())
      assert.equal('SELECT * FROM test WHERE `TABLE_KEY_NAME` = ? AND ANOTHER_TABLE_KEY_NAME = ?', queryBuilder.buildPreparedStatement('AND'))
    })
  })
})
