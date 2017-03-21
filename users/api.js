const mongoose = require('mongoose')


module.exports = app => {

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