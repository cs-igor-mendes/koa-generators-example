const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

module.exports = (app) => {

    const User = mongoose.model('User')
    const api = {}

    api.createUser = function*(){
        console.log(`post request at user/create with request.body.name= ${this.request.body.name}`)

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
        console.log(`get request at user/get`)
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

    return api
}