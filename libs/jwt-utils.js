const Promise = require('bluebird')
const jwt = require('jsonwebtoken')

module.exports = {
    verifyPromisified: Promise.promisify(jwt.verify, jwt),
    sign: jwt.sign
}