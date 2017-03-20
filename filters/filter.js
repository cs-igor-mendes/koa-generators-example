const jwt = require('jsonwebtoken')

module.exports = (app) => {
    app.use()

    function *tokenFilter(next){
        console.log('Req passed by filter')
        yield next;
    }
}