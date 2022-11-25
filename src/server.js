const { App } = require('./config/app.config');

const app = new App();

(async () => {
	console.log('================================');
	app.start();
	app.startMongooseConnection();
	app.initialiseLoggers();
	app.registerParsers();
	app.registerRoutes();
	app.registerMiddleware();
})()
	.catch(async (error) => {
		console.log(error);
		app.stop();
		app.stopMongooseConnection();
		process.exit(0);
	})
	.finally(() => console.log('================================'));
