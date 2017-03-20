const router  = require('koa-router')()

module.exports = app => {
    
    router.get('/get', app.users.api.getUser)
    router.post('/create', app.users.api.createUser)
    router.post('/login', app.users.api.login)

    app.use(router.routes())
}


