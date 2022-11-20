const express = require('express');

const {
	getAllRecipes,
	getRecipeById,
	addRecipe,
	updateRecipeById,
	deleteRecipeById,
} = require('../controllers/recipe.controller');

const recipeRoutes = express.Router();

recipeRoutes.get('/', getAllRecipes);
recipeRoutes.get('/:id', getRecipeById);

recipeRoutes.post('/', addRecipe);
recipeRoutes.post('/:id', updateRecipeById);

recipeRoutes.delete('/:id', deleteRecipeById);

module.exports = recipeRoutes;
