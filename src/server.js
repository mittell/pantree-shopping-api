// require('dotenv').config();
// require('./context/data.context').connect();
// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const port = process.env.PORT;

// const ingredientRoutes = require('./routes/ingredient.routes');
// const recipeRoutes = require('./routes/recipe.routes');
// const shoppingListRoutes = require('./routes/shoppingList.routes');

// app.use(bodyParser.json());
// app.use(
// 	bodyParser.urlencoded({
// 		extended: true,
// 	})
// );

// app.get('/', (req, res) => {
// 	res.send('Pantree - Shopping API v1.0.0');
// });

// app.use('/api/ingredients', ingredientRoutes);
// app.use('/api/recipes', recipeRoutes);
// app.use('/api/shoppingLists', shoppingListRoutes);

// app.listen(port, () => {
// 	console.log(`App is listening on port ${port}...`);
// });

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
