const router  = require('koa-router')()

module.exports = app => {
    
    router.get('/get', app.users.api.getUser)
    router.post('/create', app.users.api.createUser)

    return router
}


