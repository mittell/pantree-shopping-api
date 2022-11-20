const mongoose = require('mongoose');
const { IngredientSchema } = require('./ingredient.model');

const recipeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	ingredients: [IngredientSchema],
});

module.exports = {
	Recipe: mongoose.model('Recipe', recipeSchema),
	RecipeSchema: recipeSchema,
};
