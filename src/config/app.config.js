require('dotenv/config');
const express = require('express');
const { Server } = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

const {
	handleErrors,
	handleInvalidUrl,
} = require('../middleware/error.middleware');

const ingredientRoutes = require('../routes/ingredient.routes');
const recipeRoutes = require('../routes/recipe.routes');
const shoppingListRoutes = require('../routes/shoppingList.routes');

class App {
	constructor() {
		this.app = express();
		this.server = new Server();
		this.port = process.env.PORT;
	}

	initialiseLoggers() {
		// TODO - Add Logger Middleware here...

		console.log('Loggers initialised...');
	}
	registerParsers() {
		const corsOptions = {
			allowedHeaders: [
				'Origin',
				'X-Requested-With',
				'Content-Type',
				'Accept',
				'X-Access-Token',
			],
			credentials: true,
			methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
			origin: '*',
			preflightContinue: false,
		};

		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.app.use(cors(corsOptions));
		this.app.use(helmet());

		console.log('Parsers registered...');
	}
	registerRoutes() {
		this.app.get('/', (req, res) => {
			res.send(`Pantree - Shopping API v${process.env.VERSION}`);
		});

		this.app.use('/api/ingredients', ingredientRoutes);
		this.app.use('/api/recipes', recipeRoutes);
		this.app.use('/api/shoppingLists', shoppingListRoutes);

		console.log('Routes registered...');
	}
	registerMiddleware() {
		this.app.use(handleInvalidUrl);
		this.app.use(handleErrors);

		console.log('Middleware registered...');
	}

	start() {
		return new Promise((resolve) => {
			this.server = this.app.listen(this.port, resolve);
			console.log(`Server listening on port ${this.port}...`);
			console.log(`Environment - ${process.env.NODE_ENV}`);
		});
	}
	stop() {
		return new Promise((resolve, reject) => {
			this.server.close((error) => {
				if (error) {
					return reject(error);
				}
				resolve();
			});
		});
	}

	startMongooseConnection() {
		const mongooseOptions = {
			serverSelectionTimeoutMS: 5000,
		};

		this.mongooseConnection = mongoose.connection;

		console.log('Attempting MongoDB connection...');

		mongoose
			.connect(process.env.MONGO_URI, mongooseOptions)
			.then(() => {
				console.log('MongoDB successfully connected!');
			})
			.catch((error) => {
				console.log(`MongoDB connection was unsuccessful... `, error);
			});
	}

	stopMongooseConnection() {
		this.mongooseConnection.close();
	}
}

module.exports = { App };
