import { App } from './config/app.config';

const app = new App();

(async () => {
	console.log('================================');
	await app.start();
	await app.startMongooseConnection();
	await app.initialiseLoggers();
	await app.registerParsers();
	await app.registerRoutes();
	await app.registerMiddleware();
})()
	.catch(async (error) => {
		console.log(error);
		await app.stop();
		await app.stopMongooseConnection();
		process.exit(0);
	})
	.finally(() => console.log('================================'));
