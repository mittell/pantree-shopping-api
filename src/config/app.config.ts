import 'dotenv/config';
import env from '../config/env.config';
import express, { Application } from 'express';
import { Server } from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import mongoose, { Connection } from 'mongoose';

import { handleErrors, handleInvalidUrl } from '../middleware/error.middleware';

import { registerCommonRoutes } from '../routes/common.routes';
// import ingredientRoutes from '../routes/ingredient.routes';
// import recipeRoutes from '../routes/recipe.routes';
// import shoppingListRoutes from '../routes/shoppingList.routes';

export class App {
	public app: Application;
	public server: Server;
	public port: number;
	public mongooseConnection!: Connection;

	constructor() {
		this.app = express();
		this.server = new Server();
		this.port = env.PORT;
	}

	public async initialiseLoggers() {
		// TODO - Add Logger Middleware here...

		console.log('Loggers initialised...');
	}

	public async registerParsers() {
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

	public async registerRoutes() {
		registerCommonRoutes(this.app);

		// this.app.use('/api/ingredients', ingredientRoutes);
		// this.app.use('/api/recipes', recipeRoutes);
		// this.app.use('/api/shoppingLists', shoppingListRoutes);

		console.log('Routes registered...');
	}

	public async registerMiddleware() {
		this.app.use(handleInvalidUrl);
		this.app.use(handleErrors);

		console.log('Middleware registered...');
	}

	public async start() {
		return new Promise<void>((resolve) => {
			this.server = this.app.listen(this.port, resolve);
			console.log(`Server listening on port ${this.port}...`);
			console.log(`Environment - ${env.NODE_ENV}`);
		});
	}

	public async stop() {
		return new Promise<void>((resolve, reject) => {
			this.server.close((error) => {
				if (error) {
					return reject(error);
				}
				resolve();
			});
		});
	}

	public async startMongooseConnection() {
		const mongooseOptions = {
			serverSelectionTimeoutMS: 5000,
		};

		this.mongooseConnection = mongoose.connection;

		console.log('Attempting MongoDB connection...');

		mongoose
			.connect(env.MONGO_URI, mongooseOptions)
			.then(() => {
				console.log('MongoDB successfully connected!');
			})
			.catch((error) => {
				console.log(`MongoDB connection was unsuccessful... `, error);
			});
	}

	public async stopMongooseConnection() {
		this.mongooseConnection.close();
	}
}
