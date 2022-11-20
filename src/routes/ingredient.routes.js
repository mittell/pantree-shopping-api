const express = require('express');

const { getIngredients } = require('../controllers/ingredient.controller');

const ingredientRoutes = express.Router();

ingredientRoutes.get('/', getIngredients);

module.exports = ingredientRoutes;
