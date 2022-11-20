const { Recipe } = require('../models/recipe.model');

const getAllRecipes = async () => {
	return await Recipe.find({});
};

const getRecipeById = async (id) => {
	return await Recipe.findById(id);
};

const getRecipeByName = async (name) => {
	return await Recipe.findOne({ name: name });
};

const addRecipe = async (recipeData) => {
	const recipeToAdd = new Recipe({
		name: recipeData.name,
		ingredients: recipeData.ingredients,
	});

	return await recipeToAdd.save();
};

const updateRecipeById = async (recipeData) => {
	const recipeToUpdate = Recipe.findById(recipeData.id);

	recipeToUpdate.name = recipeData.name;
	recipeToUpdate.ingredients = recipeData.ingredients;

	return await recipeToUpdate.save();
};

const deleteRecipeById = async (id) => {
	const recipeToDelete = Recipe.findById(id);

	return await recipeToDelete.remove();
};

module.exports = {
	getAllRecipes,
	getRecipeById,
	getRecipeByName,
	addRecipe,
	updateRecipeById,
	deleteRecipeById,
};
