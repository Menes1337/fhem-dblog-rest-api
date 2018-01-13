const express = require('express')
const ServerMod = require('./rest/Server')
const RouteCurrent = require('./rest/route/Current')
const RouteHistory = require('./rest/route/History')
const Authentication = require('./rest/Authentication')

const server = new ServerMod(express())
const authentication = new Authentication()
const router = express.Router()

const routeHistory = new RouteHistory()
router.get('/history', authentication.authenticate, routeHistory.getList)

const routeCurrent = new RouteCurrent()
router.get('/current', authentication.authenticate, routeCurrent.getList)
router.get('/current/:device/:reading', authentication.authenticate, routeCurrent.getByDeviceReading)

server.applyRouter('/', router)

server.listen(null)
