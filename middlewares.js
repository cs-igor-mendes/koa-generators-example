const Promise = require('bluebird')
const morgan = require('koa-morgan')
const jwt = require('jsonwebtoken')
const jwtUtils = require('./libs/jwt-utils')

module.exports = app => {

    let verifyTokenMiddleware = function *(next){
        let token = this.request.header['x-access-token']
        let verified = false

        yield jwtUtils.verifyPromisified(token, app.config.secret)
        .then( decoded => {
            verified = true
        })  
        .catch( error => {
            this.body = {
                status : 'Login failed',  
                error: error.message
            }
            this.status = 401
        })

        if (verified) yield next
    }


    app.use(app.auth.routes.routes())
    app.use(verifyTokenMiddleware)
    app.use(app.users.routes.routes())

    return app
   
}