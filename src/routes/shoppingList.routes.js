const express = require('express');

const {
	generateShoppingList,
} = require('../controllers/shoppingList.controller');

const recipeRoutes = express.Router();

recipeRoutes.post('/generate', generateShoppingList);

module.exports = recipeRoutes;
