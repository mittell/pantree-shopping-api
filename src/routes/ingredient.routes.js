const express = require('express');

const {
	getAllIngredients,
	getIngredientById,
	getIngredientByName,
	addIngredient,
	updateIngredientById,
	deleteIngredientById,
} = require('../controllers/ingredient.controller');

const ingredientRoutes = express.Router();

ingredientRoutes.get('/', getAllIngredients);
ingredientRoutes.get('/:id', getIngredientById);
// ingredientRoutes.get('/:name', getIngredientByName);

ingredientRoutes.post('/', addIngredient);
ingredientRoutes.post('/:id', updateIngredientById);

ingredientRoutes.delete('/:id', deleteIngredientById);

module.exports = ingredientRoutes;
