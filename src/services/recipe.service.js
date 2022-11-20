const { Recipe } = require('../models/recipe.model');

const getAll = async () => {
	return await Recipe.find({});
};

const getById = async (id) => {
	return await Recipe.findById(id);
};

const getByName = async (name) => {
	return await Recipe.findOne({ name: name });
};

const add = async (recipeData) => {
	const recipeToAdd = new Recipe({
		name: recipeData.name,
		ingredients: recipeData.ingredients,
	});

	return await recipeToAdd.save();
};

const updateById = async (recipeData) => {
	const recipeToUpdate = Recipe.findById(recipeData.id);

	recipeToUpdate.name = recipeData.name;
	recipeToUpdate.ingredients = recipeData.ingredients;

	return await recipeToUpdate.save();
};

const deleteById = async (id) => {
	const recipeToDelete = Recipe.findById(id);

	return await recipeToDelete.remove();
};

module.exports = {
	getAll,
	getById,
	getByName,
	add,
	updateById,
	deleteById,
};
