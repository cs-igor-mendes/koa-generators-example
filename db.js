const mongoose = require('mongoose')
const bluebird = require('bluebird')

mongoose.Promise = bluebird;

module.exports = (app) => {
	mongoose.connect(app.config.uri);

	mongoose.connection.on('connected', () => 
		(`Connected to MongoDB at ${app.config.uri}`)
	)

	mongoose.connection.on('error',(error) => 
		console.log('Erro na conexão: ' + error)
	)

	mongoose.connection.on('disconnected', () => 
		console.log('Desconectado do MongoDB')
	)

	process.on('SIGINT', () => {
		mongoose.connection.close(() => {
			console.log('Aplicação terminada, conexão fechada')
			process.exit(0)
		})
		
	})
}