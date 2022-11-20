const mongoose = require('mongoose');
const { IngredientSchema } = require('./ingredient.model');

const recipeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	ingredients: [
		{
			name: {
				type: String,
				required: true,
			},
			amount: {
				type: Number,
				required: true,
			},
			measurement: {
				type: String,
				required: true,
			},
		},
	],
});

module.exports = {
	Recipe: mongoose.model('Recipe', recipeSchema),
	RecipeSchema: recipeSchema,
};
