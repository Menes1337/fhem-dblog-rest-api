import express = require('express')
import Server = require('./rest/Server')
import RouteCurrent = require('./rest/route/Current')
import RouteHistory = require('./rest/route/History')
import Authentication = require('./rest/Authentication')
import MySQLRepository = require('./fhem/repository/MySQL')
import MySQL2 = require('mysql2/promise')

const server = new Server(express())
const authentication = new Authentication()
const router = express.Router()

const asyncCode: any = (async function () {
  const mySQLCredentials: MySQL2.ConnectionOptions = require('../.mysql.credentials')
  try {
    const mysql: MySQL2.Connection = await MySQL2.createConnection(mySQLCredentials)

    const mySQLRepository = new MySQLRepository(mysql)

    const routeHistory = new RouteHistory(mySQLRepository)
    router.get('/history', authentication.authenticate, (req, res) => {
      routeHistory.getList(req, res)
    })

    const routeCurrent = new RouteCurrent(mySQLRepository)
    router.get('/current', authentication.authenticate, (req, res) => {
      routeCurrent.getList(req, res)
    })
    router.get('/current/:device/:reading', authentication.authenticate, routeCurrent.getByDeviceReading)

    server.applyRouter('/', router)

    server.listen(3000)
  } catch (error) {
    console.log(error.message)
  }
})()
