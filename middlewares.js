const jwt = require('jsonwebtoken')
const bluebird = require('bluebird')

//TODO: Como buscar o x-access-token no header
module.exports = app => {
    app.use(function*(next) {
        // console.log(`first filter with: `)
        // let jwtPromise = Promise.promisify(jwt.verify, jwt)
        // jwtPromise()
        // .then(() => {

        // })
        // .catch(err => {
        //     this.status = 401
        //     this.body = {'status': 'Unauthorized'}
        // })
        yield next
    })
}