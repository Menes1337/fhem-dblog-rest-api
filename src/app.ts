import express = require('express')
import Server = require('./rest/Server')
import RouteCurrent = require('./rest/route/Current')
import RouteHistory = require('./rest/route/History')
import Authentication = require('./rest/Authentication')
import MySQLRepository = require('./fhem/repository/MySQL')
import QueryBuilderFactory = require('./fhem/repository/mysql/QueryBuilderFactory')
import MySQL2 = require('mysql2/promise')

const server = new Server(express())
const authentication = new Authentication()
const router = express.Router()

const asyncCode: any = (async function () {
  const mySQLCredentials: MySQL2.ConnectionOptions = require('../.mysql.credentials')
  try {
    const mysql: MySQL2.Pool = MySQL2.createPool(mySQLCredentials)
    const mySQLRepository = new MySQLRepository(mysql, new QueryBuilderFactory())

    const routeHistory = new RouteHistory(mySQLRepository)
    router.get('/history/:from?/:to?', authentication.authenticate, (req, res) => {
      try {
        routeHistory.getList(req, res).catch(() => console.log('done'))
      } catch (err) {
        console.log(err.message)
      }
    })

    const routeCurrent = new RouteCurrent(mySQLRepository)
    router.get('/current', authentication.authenticate, (req, res) => {
      try {
        routeCurrent.getList(req, res).catch(() => console.log('error'))
      } catch (err) {
        console.log(err.message)
      }
    })
    router.get('/current/:device/:reading?', authentication.authenticate, (req, res) => {
      routeCurrent.getByDeviceReading(req, res).catch(() => console.log('error'))
    })

    server.applyRouter('/', router)

    server.listen(null)
  } catch (error) {
    console.log(error.message)
  }
})
asyncCode()
