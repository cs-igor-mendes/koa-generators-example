const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


module.exports = (app) => {

    const User = mongoose.model('User')
    const api = {}

    api.createUser = function*(){
        let user = new User({
            'name': this.request.body.name, 
            'password': this.request.body.password
        })

        yield user.save()
            .then(user => {
                this.response.status = 201;
                this.body = {message: "Created"};
            })
            .catch(err => {
                this.response.status = 500;
                this.body = err
            })
    }

    api.getUser = function*(){
        yield User.find({})
            .then(users => {
                console.log(`firts user found: ${users[0].name}`)
                this.response.status = 200
                this.body = users
            })
            .catch(err => {
                this.response.status = 500;
                this.body = err
            })
    }

    api.login = function*(next){
        yield User.findOne({'name': this.request.body.name, 'password': this.request.body.password})
        .then(user => {
            if (user){
                let token = jwt.sign({
                        data: this.request.body.name
                    }, 'secret', { expiresIn: '1h' })

                console.log(`token created: ${token}`)
                this.set('x-access-token', token)
                this.body = {'status': 'Authenticated'}
            }
            else {
                console.log(`token not created`)
                this.response.status = 401
                this.body = {'status': 'User/ Password not accepted'}
            }
        })
        .catch(err => {
            this.response.status = 401
            this.body = {err}
        })
    }

    return api
}