const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	ingredients: [
		{
			ingredient: {
				type: mongoose.ObjectId,
				ref: 'Ingredient',
			},
			amount: {
				type: Number,
				required: true,
			},
			_id: false,
		},
	],
});

module.exports = {
	Recipe: mongoose.model('Recipe', recipeSchema),
	RecipeSchema: recipeSchema,
};
