const { Ingredient } = require('../models/ingredient.model');

const getAllIngredients = async () => {
	return await Ingredient.find({});
};

const getIngredientById = async (id) => {
	return await Ingredient.findById(id);
};

const getIngredientByName = async (name) => {
	return await Ingredient.findOne({ name: name });
};

const addIngredient = async (ingredientData) => {
	const ingredientToAdd = new Ingredient({
		name: ingredientData.name,
		amount: ingredientData.amount,
		measurement: ingredientData.measurement,
	});

	return await ingredientToAdd.save();
};

const updateIngredientById = async (ingredientData) => {
	const ingredientToUpdate = Ingredient.findById(ingredientData.id);

	ingredientToUpdate.name = ingredientData.name;
	ingredientToUpdate.amount = ingredientData.amount;
	ingredientToUpdate.measurement = ingredientData.measurement;

	return await ingredientToUpdate.save();
};

const deleteIngredientById = async (id) => {
	const ingredientToDelete = Ingredient.findById(id);

	return await ingredientToDelete.remove();
};

module.exports = {
	getAllIngredients,
	getIngredientById,
	getIngredientByName,
	addIngredient,
	updateIngredientById,
	deleteIngredientById,
};
