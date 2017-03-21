const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

module.exports = app => {

    const User = mongoose.model('User')

    let api = {
        login: function *(next) {
            yield User.findOne({'name': this.request.body.name, 'password': this.request.body.password})
            .then(user => {
                if (user){
                    let token = jwt.sign({
                            data: this.request.body.name
                        }, app.config.secret, { expiresIn: '1h' })

                    this.set('x-access-token', token)
                    this.body = {'status': 'Authenticated'}
                }
                else {
                    this.response.status = 401
                    this.body = {'status': 'User/ Password not accepted'}
                }
            })
            .catch(err => {
                this.response.status = 401
                this.body = {err}
            })
        }
    }

    return api
}