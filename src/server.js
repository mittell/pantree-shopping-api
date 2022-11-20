require('dotenv').config();
require('./context/data.context').connect();
const express = require('express');

const app = express();
const port = process.env.PORT;

const ingredientRoutes = require('./routes/ingredient.routes');
const recipeRoutes = require('./routes/recipe.routes');

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Pantree - Shopping API v1.0.0');
});

app.use('/api/ingredients', ingredientRoutes);
app.use('/api/recipes', recipeRoutes);

app.listen(port, () => {
	console.log(`App is listening on port ${port}...`);
});
