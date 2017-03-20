const koa = require('koa')
const koaRouter = require('koa-router')
const consign = require('consign')
var bodyParser = require('koa-body-parser')

const app = new koa()
const router = koaRouter()

app.use(bodyParser())

consign()
.include('config.js')
.then('db.js')
.then('users/model.js')
.then('users/api.js')
.then('middlewares.js')
.then('users/routes.js')
.into(app)

app.listen(3000)



