require('dotenv').config();
require('../context/data.context').connect();
const { default: mongoose } = require('mongoose');

const seedIngredients = require('./ingredientData');
const seedRecipes = require('./recipeData');

const { Ingredient } = require('../models/ingredient.model');
const { Recipe } = require('../models/recipe.model');

const seedDB = async () => {
	console.log('Removing existing entries...');

	await Ingredient.deleteMany({});
	await Recipe.deleteMany({});

	console.log('Seeding new entries...');

	await Ingredient.insertMany(seedIngredients);
	await Recipe.insertMany(seedRecipes);
};

seedDB()
	.then(() => {
		mongoose.connection.close();
	})
	.catch((error) => {
		console.log(`ERROR: ${error}`);
	});
