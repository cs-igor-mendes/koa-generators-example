const router  = require('koa-router')()

module.exports = app => {
    router.all('/login', app.auth.api.login)

    return router
}