var mongoose = require('mongoose')

module.exports = app => {

    const userSchema = new mongoose.Schema({ 
        name: String, 
        password: String
    })

    const user = mongoose.model('User', userSchema)
    
    return app
}