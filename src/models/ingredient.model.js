const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
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
});

module.exports = {
	Ingredient: mongoose.model('Ingredient', ingredientSchema),
	IngredientSchema: ingredientSchema,
};
